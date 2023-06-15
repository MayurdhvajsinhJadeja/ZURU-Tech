const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { validateToken } = require("../middleware/JWT");
const upload = require("../middleware/upload");
const Joi = require("joi");
const { registerSchema, loginSchema } = require("../middleware/validate");

router.post("/register", async (req, res, next) => {
    try {
      await registerSchema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error.details && error.details.length > 0) {
        res.status(400).json({ error: error.details[0].message });
      } else {
        res.status(400).json({ error: "Invalid request body" });
      }
    }
  }, UserController.register);
  
  router.post("/login", async (req, res, next) => {
    try {
      await loginSchema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error.details && error.details.length > 0) {
        res.status(400).json({ error: error.details[0].message });
      } else {
        res.status(400).json({ error: "Invalid request body" });
      }
    }
  }, UserController.login);
  

router.post("/upload", upload.single("file"), validateToken, UserController.uploadFiles);
router.get("/files", validateToken,UserController.getFilesSpecificUser);
router.get("/all-files", validateToken,UserController.getAllfiles);
router.delete("/files/:id", validateToken,UserController.deleteFile);
router.patch("/files/:id", validateToken,UserController.updateFile);

module.exports = router;
