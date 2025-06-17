const express = require("express");
const { addTodo, getTodo, deleteTodo, toggleCheckbox, updateTodo } = require("../controllers/todo.controller");
const todoRouter = express.Router();


todoRouter.post("/addTodo", addTodo)
todoRouter.get("/submittedTodo", getTodo)
todoRouter.post('/delete', deleteTodo)
todoRouter.post('/update', updateTodo)
todoRouter.put('/toggle', toggleCheckbox)

module.exports = todoRouter