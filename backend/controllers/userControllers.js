// auth user/set token
// route  POST api/users/auth
//  @access PUBLIC
const authUser=(req,res)=>{
res.status(200).json({message:"auth user"})
}

export {authUser};