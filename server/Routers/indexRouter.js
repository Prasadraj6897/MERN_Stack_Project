import express from "express"
import { indexController } from "../Controllers/IndexController.js";

const router = express.Router();


router.get('/', indexController)

export default router;