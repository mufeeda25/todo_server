const db=require('../models/Todo');
const dbUser = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const salt = "ertfyguh";
const jwtSecret="verysecretoken";



const getTodos=()=>{
    return db.Todo.find();
}
const getTodo = (id)=>{
    return db.Todo.findOne({_id:id});
}
const createTodo=(data)=>{
    const todo = new db.Todo(data);
    todo.save()
    .then(d=>{
        console.log(d);
    })
    .catch(err=>{
        console.log(err);
    });
    return{
        statusCode:200,
        message:"todo created successfully"
    }
}
const verifyToken=(bearerToken,req,res,next)=>{
jwt.verify(bearerToken, jwtSecret, function(err, decoded){
if(err){
res.status(401).json({message:"invalid token"});
}
else{
req.user_id= decoded.id;
next();
}
})
}
const login =(data)=>{
    return dbUser.User.findOne({email:data.email})
    .then(user=>{
        if(!user){
            return{
                statusCode:422,
                message:"invalid credentials"
            }
        }
        const hash=generateHash(data.password);
        if(hash==user.password){
            const token=jwt.sign({id:user._id},jwtSecret)
            return{
                token,
                statusCode:200,
                message:"logged in"
            }
        }
        else{
            return{
                statusCode:422,
                message:"invalid credentials"
            }
        }

    })
}
const generateHash=(password)=>{
    const hash =crypto.pbkdf2Sync(password,salt ,1000,64,'sha512').toString('hex');
    return hash;
}
const createUser=(data)=>{
   return dbUser.User.findOne({email:data.email})
    .then(user=>{
        if(user){
            return{
                statusCode:422,
                message:"user already exist"
            }
        }
       const hash= generateHash(data.password);
        
        data.password=hash;
        const newUser=new dbUser.User(data);
newUser.save();
return{
    statusCode:200,
    message:"user created successfully"
}

    })
    

}
const updateTodo = (id, data)=>{
    return db.Todo.findOneAndUpdate({
        _id:id
    },data);
}
const deleteTodo = (id)=>{
    return db.Todo.deleteOne({
        _id:id
    });
}

module.exports ={
    createTodo,
    getTodos,
    createUser,
    generateHash,
    login,
    verifyToken,
    updateTodo,
    deleteTodo,
    getTodo
}