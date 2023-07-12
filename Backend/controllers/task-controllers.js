import UserTask from "../models/Task.js";
import User from "../models/user.js";

export const addTask = async (req,res)=>{
    try{
    const {title,body,dueDate} = req.body;
    if(!title || !body){
        return res.status(422).json({error: "Please add all the fields"});
    }
    req.user.password = undefined;
    const task = new UserTask({
        title,
        body,
        dueDate,
        status:false,
        assignedTo:req.user
    })
    const result = await task.save();

    res.json({userTask:result})
}catch(err){
    if(err){
        console.log(err);
    }
}
}


export const addTaskAdmin = async (req, res) => {
    try {
      const { title, body, dueDate, assignedTo } = req.body;
      if (!title || !body || !assignedTo) {
        return res.status(422).json({ error: "Please add all the fields" });
      }
      const existingUser = await User.findOne({ email: assignedTo });
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const assignId = existingUser._id;
      req.user.password = undefined;
      const task = new UserTask({
        title,
        body,
        dueDate,
        status: false,
        assignedTo: assignId,
      });
      const result = await task.save();
  
      res.json({ userTask: result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  


export const myTask = async (req, res) => {
    try {
      const { _id } = req.user;
      const myTasks = await UserTask.find({ assignedTo: _id });
      res.json({ myTasks });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

export const updateTask =   async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
  
      const updatedTask = await UserTask.findOneAndUpdate(
        { _id: taskId },
        { status:true }
      );
  
      res.json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  export const deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      await UserTask.findByIdAndDelete(taskId);
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  

  export const allTask = async (req,res)=>{
    try{
      
      const tasks = await UserTask.find();
      res.json({allTask:tasks});

    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      }
  }

  