import multer from "multer";

const Servicestorage = multer.diskStorage({
  destination: "uploads/services",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const doctorstorage = multer.diskStorage({
  destination: "uploads/doctors",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const departmentstorage = multer.diskStorage({
  destination: "uploads/departments",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const noticestorage = multer.diskStorage({
  destination: "uploads/notices",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const uploadService = multer({ storage: Servicestorage });
export const uploadDoctor = multer({ storage: doctorstorage });
export const uploadDepartment = multer({ storage: departmentstorage });
export const uploadNotice = multer({ storage: noticestorage });
