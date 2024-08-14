import userSchema from "./userSchema.js";

export const createUser=(obj)=>{
    console.log(obj)
return userSchema(obj).save()
}


export const findUser = (obj)=>{
    return userSchema.findOne(obj);
}

