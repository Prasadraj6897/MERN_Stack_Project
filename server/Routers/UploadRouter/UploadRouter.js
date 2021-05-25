import express from "express"
import { authMiddleware } from "../../Controllers/AuthMiddlewareController/authMiddleware.js";
import { UploadImage } from "../../Controllers/AuthMiddlewareController/UploadImage.js";
import { UploadImageController } from "../../Controllers/UploadImage/UploadImageController.js";

const router = express.Router();

router.post('/uploadAvatar', UploadImage, authMiddleware, UploadImageController)

export default router;