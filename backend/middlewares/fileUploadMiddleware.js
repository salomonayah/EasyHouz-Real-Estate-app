const multer =  require("multer") // for file upload


// File upload config ===========================================
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({

    destination:(req, file, cb )=> {

        const isValidImg =  MIME_TYPE_MAP[file.mimetype]
        let imgError = new Error("invalid file Type")
        if(isValidImg) {
            imgError = null
        }
        cb(imgError, "ifisunBackend/images");

    },
    filename:(req, file, cb ) => {
        const name = file.originalname.toLowerCase().split(" ").join("_");

        const extension =  MIME_TYPE_MAP[file.mimetype];

        const uniqueFileNameForServer = name + "_" + Date.now() + "_" + (Math.floor(Math.random() * name.length) + 1 )+ "." + extension;
        // change the filename on the req and on saving and provide an unique filename for every document
        cb(null, uniqueFileNameForServer); 
    }
})

module.exports = multer( { storage:storage } ).single("postImg")

