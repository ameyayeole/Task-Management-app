import express from 'express'
import { addTask, myTask, addTaskAdmin,updateTask,deleteTask,allTask} from '../controllers/task-controllers.js';
import { loginRequired } from '../middlewares/protected.js';
import UserTask from "../models/Task.js"
import User from '../models/user.js';


const postRouter = express.Router();

postRouter.post("/addTask",loginRequired,addTask)
postRouter.post("/addTaskAdmin",loginRequired,addTaskAdmin)
postRouter.get("/myTask",loginRequired,myTask)
postRouter.put('/updateTask/:taskId', loginRequired,updateTask)
postRouter.delete('/deleteTask/:taskId', loginRequired,deleteTask);
postRouter.get('/allTasks', loginRequired,allTask);

postRouter.get('/search', async (req, res) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userTasks = await UserTask.find({ assignedTo: user._id });
  
      res.json({ tasks: userTasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
export default postRouter;