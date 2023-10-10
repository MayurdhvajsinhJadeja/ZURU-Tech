const busboy = require('busboy');
const fs = require('fs');
const sharp = require('sharp');
const { mkdir } = require('fs/promises');
const path = require('path');
// const logger = require('./src/utils/logger');

// const { generateRandomFileNameWithoutExtension } = require('./src/utils/helpers');
const { MimeType } = require('./src/constant');

const checkAndCreateDirectory = async (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      await mkdir(dirPath, {
        recursive: true,
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

function generateRandomFileNameWithoutExtension() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports = {
  checkAndCreateDirectory,
  uploadFile: async (request, dirPath) => new Promise((resolve, reject) => {
    const stream = busboy({ headers: request.headers });
    const data = {};

    stream.on('field', (fieldname, val) => {
      data[fieldname] = val;
    });

    stream.on('file', (name, file, info) => {
      if (name === 'tvMedia') {
        const { filename, mimeType } = info;

        const [fileNameWithoutExtension, fileExtension] = filename.split('.');

        data.mimeType = MimeType[mimeType];
        if (!data.mimeType) reject(new Error('INVALID_DATA'));

        const newFileName = `${fileNameWithoutExtension}-${generateRandomFileNameWithoutExtension()}.${fileExtension}`;
        data.fileName = newFileName;
        data.uri = `${dirPath}/${newFileName}`;

        const saveTo = path.join(__dirname, data.uri);
        file.pipe(fs.createWriteStream(saveTo));
      }
    });

    stream.on('finish', () => {
      resolve(data);
    });
    stream.on('error', (err) => {
      reject(err);
    });
    request.pipe(stream);
  }),

  deleteFile: async filePath => new Promise((resolve, reject) => {
    fs.unlink(`${__dirname}${filePath}`, (err) => {
      if (err) reject(err);
      resolve();
    });
  }),

  resizeMedia: async (fileName, dirPath, imageURL) => {
    try {
      const thumbnailURL = `${dirPath}/thumbnail_${fileName}`;
      const saveTo = path.join(__dirname, thumbnailURL);
      const sourceImage = path.join(__dirname, imageURL);
      await sharp(sourceImage)
        .resize(200)
        .toFile(saveTo);
      return thumbnailURL;
    } catch (error) {
      console.log(`Error: While generating thumbnail: ${error}`);
      return undefined;
    }
  },

  syncMedia: async () => {
    const query = ``
    //   try {
    //     if (!fs.existsSync(uri)) {
    //       const query = `INSERT INTO media
    //                     (
    //                       "fileName",
    //                       "type",
    //                       "uri",
    //                       "thumbnailUri",
    //                       "folderName",
    //                       "syncByScript"
    //                     )
    //                     VALUES
    //                     ($1, $2, $3, $4, $5, true)
    //                     ON CONFLICT DO NOTHING`;
    //       const parameters = [
    //         data.fileName,
    //         data.mimeType,
    //         data.uri,
    //         thumbnailURL,
    //         __dirname,
    //       ];
    //       const queryResult = await client.query(query, parameters);
    //       res.send(queryResult.rows);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }


  };
