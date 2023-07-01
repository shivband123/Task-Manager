// taskController.js
const Task = require('../models/Task');

// Display the form to create a new task
exports.showCreateForm = (req, res) => {
  res.render('create-task',{error:null});
};

//get task home
exports.getHome=(req,res)=>{
  let user=req.user
  // console.log(user);
  res.render("taskHome",{user})
}
// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, status,priority,dueDate,assignee } = req.body;
    const newTask = new Task({
      title,
      status,
      assignee,
      priority,
      dueDate, // Assuming you have the user's ID in the request object
    });
    await newTask.save();
    res.redirect('/tasks'); // Redirect to the tasks page after successful creation
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//get single task
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    console.log(task);
    res.render('task', { task }); // Render the task view with the retrieved task
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Display all tasks
exports.getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find();

    res.render('tasks', { tasks });
  } catch (error) {
    res.render('tasks', { error: 'An error occurred while fetching the tasks.' });
  }
};

//update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status,priority,dueDate,assignee} = req.body;
    await Task.findByIdAndUpdate(id, { title, status,priority,dueDate,assignee});
    res.redirect('/tasks'); // Redirect to the tasks page after successful update
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

//delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndRemove(id);
    res.redirect("/tasks")
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
