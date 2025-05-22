const todoModel = require("../model/todo.model");


const addTodo = (req, res) => {
    // res.render('submit.ejs');
    // console.log(req.body);
    // res.send("Welcome")
    let form = new todoModel(req.body)
    // console.log(form);
    
    form.save()
    .then((savedData) => {
        console.log(savedData);
        
        res.status(201).json({
            message: 'Data saved successfully',
            data: savedData,
        });
        // res.redirect("/submit")
    })
    .catch((err) => {
        console.error('Error saving data:', err);
        res.status(500).json({
            message: 'Failed to save data',
            error: err,
        });
    });
}


const getTodo = (req,res)=>{
    todoModel.find()
    .then((response)=>{
        res.send({status: true, message: response})
        // res.send(response).json
        console.log(response);
        
    }).catch((err)=>{
        console.log(err);
        // res.status({error: err})
        
    })
}



const toggleCheckbox = async () =>{
    try{
        const {id, isDone} = req.body
        const updatedTodo = await todoModel.findByIdAndUpdate(id, {isDone}, {new: true});
        res.json(updatedTodo)
    }catch(err){
        res.status(500).json({ error: 'Toggle failed', details: err });
    }
}

const deleteTodo = (req, res) => {
    console.log(req.body);
    todoModel.findByIdAndDelete(req.body.id)
    .then((respond)=>{
     console.log("it is working");
     res.json({status: true, message: "successful", respond})
     
    }).catch((err)=>{
     console.log(err);
     res.send({status: false, message: "not successful", err})
     
    })
    
}

const updateTodo = (req, res) => {
    // console.log(req.body);
    const {_id, title, description, date} = req.body
   todoModel.findByIdAndUpdate(_id, { title, description, date }, { new: true })
    .then((updatedTodo) => {
        if (!updatedTodo) {
            
            return res.status(404).json({ message: "Todo not found" });
        }
        console.log(updateTodo);
        res.json(updatedTodo);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    });

    
}


module.exports = {addTodo, getTodo, deleteTodo, updateTodo, toggleCheckbox}