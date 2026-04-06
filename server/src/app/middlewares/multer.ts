import multer from "multer";

// Switch from diskStorage to memoryStorage
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });