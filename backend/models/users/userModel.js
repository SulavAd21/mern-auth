import userSchema from "./userSchema.js";

export const createUser = (obj) => {

    return userSchema(obj).save()
}


export const findUser = (obj) => {

    return userSchema.findOne(obj);
}

export const getUserById= _id =>{
    return userSchema.findById(_id)
}

export const updateUser= (filter,obj)=>{
    return userSchema.findOneAndUpdate(filter,obj,{new:true})
}