import fs from "fs";
//removing single image
export const removeImage = (path) => {
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (error) {
    console.log(`file not found :${path}`);
  }
};
//remove multiple upload images
export const removeImages = (files) => {
  try {
    files.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  } catch (error) {
    console.log("files not found");
  }
};
