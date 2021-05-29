import express from "express"
import { activateEmail, DeleteUserController, ForgetPasswordController, getAccessTokenController, 
getALLUserInfoController, getUserInfoController, LogoutController, 
ResetPasswordController, signInController, signUpController,
 UpdateUserInfoController, UpdateUserRoleController, google_login_Controller, facebook_login_Controller } from "../../Controllers/UserController/UserController.js";

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

//social
router.post('/google_login', google_login_Controller)
router.post('/facebook_login', facebook_login_Controller)
export default router;