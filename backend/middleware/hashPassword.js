import bcrypt from 'bcryptjs';

const salt = 10;


export const hashPassword = (password) =>{
    return bcrypt.hashSync(password,salt)
}