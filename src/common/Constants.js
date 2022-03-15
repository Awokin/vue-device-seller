import axios from 'axios';  

export const BASE_API_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:8080';

export const cloudinary = (file) => {
    const preset = "gk7pdfe7";
    let cloudinaryUrl = "https://api.cloudinary.com/v1_1/Upperlink/upload";
    const fd = new FormData();
    fd.append("upload_preset", preset);
    fd.append("file", file);
    const data = axios.post(cloudinaryUrl, fd);
    console.log(data);
    return data;
}