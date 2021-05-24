import express from "express"
import { activateEmail, signInController, signUpController } from "../../Controllers/UserController/UserController.js";
import { isRequestValidators, SignUpValidationRequest, SignInValidationRequest } from "../../Validators/auth.validator.js";

const router = express.Router();


router.post('/signup', SignUpValidationRequest, isRequestValidators, signUpController)
router.post('/activateEmail', activateEmail)

router.post('/signin', SignInValidationRequest, isRequestValidators, signInController)
// router.post('/signout', signout)

export default router;