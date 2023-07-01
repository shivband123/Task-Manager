// Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type:String,
    enum: ['Completed','Pending'],
    required: true
  },
  priority: {
    type:String,
    enum: ['High','Mid','Low'],
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignee: {
    type: String,
    required: true
  }
},{timestamps:true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
