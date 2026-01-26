// src/utils/imageUtils.js
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const captureFromCamera = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";

    input.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        resolve(e.target.files[0]);
      } else {
        reject(new Error("No image captured"));
      }
    };

    input.onerror = (e) => reject(new Error("Camera error"));
    input.click();
  });
};

export const validateImageFile = (file) => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file (JPEG, PNG, etc.)");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size should be less than 5MB");
  }

  return true;
};