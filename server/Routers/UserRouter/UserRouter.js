import express from "express"
import { activateEmail, ForgetPasswordController, getAccessTokenController, getUserInfoController, ResetPasswordController, signInController, signUpController } from "../../Controllers/UserController/UserController.js";
import { isRequestValidators, SignUpValidationRequest, SignInValidationRequest } from "../../Validators/auth.validator.js";
import { authMiddleware } from "../../Controllers/AuthMiddlewareController/authMiddleware.js";

const router = express.Router();


router.post('/signup', SignUpValidationRequest, isRequestValidators, signUpController)
router.post('/activateEmail', activateEmail)
router.post('/signin', SignInValidationRequest, isRequestValidators, signInController)
router.post('/refresh_token', getAccessTokenController)
router.post('/forget', ForgetPasswordController)
router.post('/resetpassword', authMiddleware, ResetPasswordController)
router.get('/getUserInfo', authMiddleware, getUserInfoController)
// router.post('/signout', signout)

export default router;