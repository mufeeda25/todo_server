const mongoose  = require('mongoose');

const TodoSchema = mongoose.Schema({
    name:String,
description:String,
userId: mongoose.ObjectId,
}, { timestamps: true})
const Todo = mongoose.model('Todo',TodoSchema);


module.exports={
    Todo
}