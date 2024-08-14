import bcrypt from 'bcryptjs';

const salt = 10;


export const hashPassword = (password) =>{
    return bcrypt.hashSync(password,salt)
}



export const verifyPassword=(plainPass,hashedPass)=>{
    return bcrypt.compareSync(plainPass,hashedPass)
}