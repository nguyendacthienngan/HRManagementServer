const multer = require('multer')
const constants = require('constants')

module.exports.diskStorage = (extensions, localStoragePath) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            // Định nghĩa nơi file upload sẽ được lưu lại
            callback(null, localStoragePath);
        },
        filename: (req, file, callback) => {
            // let math = ["image/png", "image/jpeg"];
            if (extensions.indexOf(file.mimetype) === -1) {
                let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
                return callback(errorMess, null);
            }
            // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
            let filename = `${Date.now()}-server-${file.originalname}`;
            callback(null, filename);
        }
    });
}

module.exports.uploadSingleFileTask = (diskStorage, fileField) => {
    return multer({ storage: diskStorage }).single(fileField);
}