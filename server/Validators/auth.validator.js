import {check, validationResult} from 'express-validator'


export const SignUpValidationRequest =[
        check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
        check('lastName')
        .notEmpty()
        .withMessage('lastName is required'),
        check('email')
        .isEmail()
        .withMessage('Please provide vaid email'),
        check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long'),
        // check('ConfirmPassword').custom((value, { req }) => {
        //     if (value !== req.body.password) {
        //       throw new Error('Password confirmation does not match password');
        //     }
        // })
        
    ]


export const SignInValidationRequest = [
        check('email')
        .isEmail()
        .withMessage('Please provide vaid email'),
        check('password')
        .isLength({ min: 6 })
        .withMessage('must be at least 6 chars long'),
        
    ]


export const isRequestValidators = async (req, res, next)=>{
    const errors = validationResult(req)
    if(errors.array().length > 0)
    {
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();

}