const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { createTokens } = require("../middleware/JWT");
const fs = require("fs");
const db = require("../models");
// const Joi = require('joi');
// const { registerSchema, loginSchema } = require('../middleware/validate');

const Image = db.images;

const UserController = {
  register: async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      res.status(400).json({ error: "User already exist" });
    }

    if (password === cpassword) {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          Users.create({
            username: username,
            email: email,
            role: role,
            password: hash,
          })
            .then(() => {
              res.status(200).json({ message: "User Registered" });
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        })
        .catch((err) => {
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      res.status(400).json({ error: "Passwords do not match" });
    }
  },

  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      res.status(400).json({ error: "User Doesn't Exist" });
    }

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong email and Password Combination!" });
      } else {
        const accessToken = createTokens(user);

        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.status(200).json({ message: "Login Successful" });
      }
    });
  },

  uploadFiles: async (req, res) => {
    try {
      const user = await Users.findOne({ where: { username: req.user.username } });
      const userEmail = user.email;
      if (user.role == "admin" || user.role == "developer") {
        if (req.file == undefined) {
          return res.status(400).json({error: 'You must select a file.'});
        }
        if (req.body.description == "" || req.body.description == null) {
          return res.status(400).json({error: 'You must enter description.'});
        }
        if (req.file.size > 1024 * 1024) {
          return res.status(400).json({error: 'File size must be less than 1MB.'});
        }

        Image.create({
          type: req.file.mimetype,
          name: req.file.originalname,
          data: fs.readFileSync(
            "resources/static/assets/uploads/" + req.file.filename
          ),
          userEmail: userEmail, // Save the email with the image
          description: req.body.description,
        }).then((image) => {
          fs.writeFileSync(
            "resources/static/assets/uploads/" + image.name,
            image.data
          );
          return res.status(400).json({message: 'File has been uploaded.'});
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({error: `Error when trying to upload images: ${error}`});
    }
  },
  getFilesSpecificUser: async (req, res) => {
    const user = await Users.findOne({ where: { username: req.user.username } });
    const userEmail = user.email;
    if (user.role == "developer") {
      const files = await Image.findAll({
        attributes: ["id", "name", "type", "description"],
        where: { userEmail: userEmail },
      });
      res.status(200).json(files);
    } else {
      res.status(403).json({error: "You are not authorized to view this page"});
    }
  },

  getAllfiles: async (req, res) => {
    const user = await Users.findOne({ where: { username: req.user.username } });
    if (user.role == "admin" || user.role == "guest") {
      const files = await Image.findAll({
        attributes: ["id", "name", "type", "description"],
      });
      res.status(200).json(files);
    }
  },

  deleteFile: async (req, res) => {
    const id = req.params.id;
    const user = await Users.findOne({ where: { username: req.user.username } });
    if (user.role == "admin") {
      const file = await Image.findOne({
        where: { id: id },
      });
      if (!file) {
        return res.status(400).send({
          error: "File Not Found",
        });
      }
      await file.destroy();
      return res.status(200).send({
        error: "File deleted successfully!",
      });
    } else {
      return res.status(403).send({
        error: "You are not authorized to perfrom this action",
      });
    }
  },
  updateFile: async (req, res) => {
    const id = req.params.id;
    const user = await Users.findOne({ where: { username: req.user.username } });
    if (user.role == "admin") {
      const file = await Image.findOne({
        where: { id: id },
      });
      if (!file) {
        return res.status(400).send({
          error: "File Not Found",
        });
      }
      await file.update({
        description: req.body.description,
      });

      const updatedFile = await Image.findOne({ where: { id: id } });

      if (updatedFile.description !== req.body.description) {
        return res.status(500).send({
          error: "Failed to update file description",
        });
      }

      return res.status(200).send({
        message: "File updated successfully!",
      });
    }
  },
};

module.exports = UserController;
