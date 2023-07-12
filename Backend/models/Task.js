import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required: true
    },
    status:{
        type:Boolean,
        required: true
    },
    assignedTo:{
        type:ObjectId,
        required: true
    }
})
export default mongoose.model("UserTask",taskSchema);