const multer = require('multer');
const path = require('path');

const config = {
  storage: multer.diskStorage({
    destination: async (request, file, callback) => {
      callback(null, path.resolve(__dirname, 'uploads','images','product'));
    },
    filename: (request, file, callback) => {
      callback(null, file.originalname);
    }
  })
}

module.exports = config;
