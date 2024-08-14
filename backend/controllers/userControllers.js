import { createUser, findUser, updateUser,getUserById } from '../models/users/userModel.js';
import { hashPassword, verifyPassword } from '../middleware/hashPassword.js';
import generateToken from '../utils/generateToken.js';



// auth user/set token
// route  POST api/users/auth
//  @access PUBLIC
const authUser = async (req, res) => {
   
    try {
        const {email,password}= req.body;
       
        const user = await findUser({email})
       
        if(user){
           
            const isMatched =  verifyPassword(password,user.password)
            generateToken(res,user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
             
        }else{
           
            res.status(401).json("Invalid email or password")
        }
        
    } catch (error) {
        console.log(error.message)
        
        
    }
    // res.status(200).json({ message: "auth user" })
}

// register user

const registerUser = async (req, res) => {
    try {
        const hashPass = hashPassword(req.body.password);
        req.body.password = hashPass;

        const result = await createUser(req.body);
        console.log(result)


        if (result) {
            generateToken(res,result._id)
            res.status(201).json({
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

    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({ message: "User Logged out" })
}

// get user profile
const getUserProfile = async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
}

//  update user profile
const updateUserProfile = async (req, res) => {
    const user = await getUserById(req.user._id);
    if(user){
   const {name,email,password} = req.body;

    const hashedpassword =  hashPassword(password)
   
   const updatedUser = await updateUser(user._id,{name,email,password:hashedpassword});
   res.status(200).json({
    _id: updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email
   })
    
    }else{
        res.status(404).json("User not found")
    }
   
}

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };