// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads"); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     },
// });

// const fileFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only images are allowed!"), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
// }).single("image");

// module.exports =  upload ;
