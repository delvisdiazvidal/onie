import { upload_path } from '../config/env';
import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid';

// Settings
const docInfo = multer.diskStorage({
    destination: upload_path.docs_info,
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

const docUser = multer.diskStorage({
    destination: upload_path.users,
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

export const dinfo = multer({storage: docInfo});
export const duser = multer({storage: docUser});
