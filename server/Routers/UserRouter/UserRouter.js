import express from "express"
import { activateEmail, DeleteUserController, ForgetPasswordController, getAccessTokenController, 
getALLUserInfoController, getUserInfoController, LogoutController, 
ResetPasswordController, signInController, signUpController,
 UpdateUserInfoController, UpdateUserRoleController } from "../../Controllers/UserController/UserController.js";

import { isRequestValidators, SignUpValidationRequest, SignInValidationRequest } from "../../Validators/auth.validator.js";
import { authMiddleware } from "../../Controllers/AuthMiddlewareController/authMiddleware.js";
import { authAdmin } from "../../Controllers/AuthMiddlewareController/authAdminController.js";

const router = express.Router();


router.post('/signup', signUpController)
router.post('/activateEmail', activateEmail)
router.post('/signin', signInController)
router.post('/refresh_token', getAccessTokenController)
router.post('/forget', ForgetPasswordController)
router.post('/resetpassword', authMiddleware, ResetPasswordController)
router.get('/getUserInfo', authMiddleware, getUserInfoController)
router.get('/getALLUserInfo',authMiddleware, authAdmin, getALLUserInfoController)
router.get('/logout', LogoutController)

//Update Users
router.patch('/update', authMiddleware, UpdateUserInfoController)
router.patch('/update_role/:id', authMiddleware, authAdmin, UpdateUserRoleController)

router.delete('/delete/:id', authMiddleware, authAdmin, DeleteUserController)

export default router;