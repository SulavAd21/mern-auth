import { createUser, findUser } from '../models/users/userModel.js';
import { hashPassword } from '../middleware/hashPassword.js';
import userSchema from '../models/users/userSchema.js';


// auth user/set token
// route  POST api/users/auth
//  @access PUBLIC
const authUser = async (req, res) => {
    res.status(200).json({ message: "auth user" })
}

// register user

const registerUser = async (req, res) => {
    try {
        const hashPass = hashPassword(req.body.password);
        req.body.password = hashPass;

        const result = await createUser(req.body);
        console.log(result)


        if (result) {
            res.status(200).json({
                _id: result._id,
                name: result.name,
                email: result.email
            })
        } else {
            res.status(400);
            throw new Error("Unable to create new user")
        }

    } catch (err) {

        err.status = 500;

        if (err.message.includes("E11000 duplicate key")) {
            err.message = "Email already exists";
            err.status = 200;
        }
        res.json(err.message)

    }

}

// logout user

const logoutUser = async (req, res) => {
    res.status(200).json({ message: "logout user" })
}

// get user profile
const getUserProfile = async (req, res) => {
    res.status(200).json({ message: "Get user profile" })
}

//  update user profile
const updateUserProfile = async (req, res) => {
    res.status(200).json({ message: "Update user profile" })
}

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };