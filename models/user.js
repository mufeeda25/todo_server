const mongoose  = require('mongoose');

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
}, { timestamps: true})
const User = mongoose.model('User',UserSchema);


module.exports={
    User
}