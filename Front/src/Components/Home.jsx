import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "./Navbar";
import { lightGreen } from "@mui/material/colors";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [display, setDisplay] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const endpoint = "https://task-tracker-gzvf.vercel.app/todo/addTodo";
  const answer = "https://task-tracker-gzvf.vercel.app/todo/submittedTodo";
  const delete_url = "https://task-tracker-gzvf.vercel.app/todo/delete";
  const update_url = "https://task-tracker-gzvf.vercel.app/todo/update";
  const checkbox_url = "https://task-tracker-gzvf.vercel.app/todo";
  //

  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem("users"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const todoInfo = (e) => {
    e.preventDefault();
    if (title === "" || description === "" || dueDate === "") {
      alert("Please enter todo title and description");
    } else {
      const obj = { title, description, dueDate, userId };
      console.log(obj);
      alert('Task add successfully')
      axios
        .post(endpoint, obj)
        .then((res) => {
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });

      setTitle("");
      setDesc("");
    //   setDueDate("");
    }
  };

  // ... (other imports and state variables) ...

  const toggleDone = async (todo) => {
    try {
      const response = await axios.put(`${checkbox_url}/toggle`, {
        done: !todo.isDone,
      });

      const updatedTodos = display.map((item) =>
        item._id === todo._id ? response.data : item
      );
      setDisplay(updatedTodos);
    } catch (error) {
      console.error("Error toggling task:", error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  // const toggleDone = (todo) => {
  //     const updatedStatus = !todo.isDone
  //     axios.post(`${checkbox_url}/toggle`, {id: todo._id, isDone: updatedStatus})
  //     .then((res)=> {
  //         const updatedTodos = display.map(item =>
  //             item._id === todo._id ? res.data : item
  //           );
  //           setDisplay(updatedTodos);
  //     }).catch((err)=>{
  //         console.log(err);

  //     })
  // }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get(answer)
      .then((res) => {
        // console.log(res.data.message);
        const allTodo = res.data.message || [];
        const userTodo = allTodo.filter((todo) => todo.userId === userId);
        // console.log(userTodo);
        allTodo.forEach((todo) => {
          // console.log("todo.userId:", todo.userId, "type:", typeof todo.userId);
        });

        setDisplay(userTodo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const deleteInfo = (id) => {
    1;
    const confirmDelete = confirm(
      "This action is irreversible, Are you sure you want to delete it?"
    );
    console.log(confirmDelete);
    if (confirmDelete === true) {
      axios
        .post(delete_url, { id })
        .then((res) => {
          // console.log(res);
          const updatedDisplay = display.filter((todo) => todo._id !== id);
          // console.log(updatedDisplay);

          setDisplay(updatedDisplay);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("It can not deleted");
    }
  };

  const editTodo = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleSaveEdit = (updatedTodo) => {
    console.log(updatedTodo);
    // const update = {title: updatedTodo.title, description:updatedTodo.description, date: updatedTodo.date}
    axios
      .post(update_url, updatedTodo)

      .then((res) => {
        // console.log(res);

        const updatedList = display.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
        setDisplay(updatedList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          overflowX: "auto",
        }}
      >
        <nav className="container-fluid">
          <div className="row py-2">
            <div className="mb-3 col-6">
              <h3>
                Welcome! <span className="name">{user.firstName}</span>
                &nbsp;<span className="name">{user.lastName}</span>
              </h3>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <Tooltip
                title="Logout"
                arrow
                placement="bottom"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <IconButton onClick={handleLogout} color="error">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </nav>
        <section style={{paddingTop: "30px" }}>
          <form className="col-11 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto pb-4 text-center ">
            <h2 className="mb-3">Task Tracker</h2>
            <input
              type="text"
              name="title"
              placeholder="Todo Title"
              className="form-control shadow-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="description"
              placeholder="Todo Description"
              className="form-control shadow-none my-3"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="datetime-local"
              name="dueDate"
              className="form-control shadow-none my-3"
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={todoInfo}>
              Add Todo
            </button>
          </form>
        </section>
        <div>
          {display.length === 0 ? (
            <div className="text-center">
              <h4>No Todo yet</h4>
            </div>
          ) : (
            <div>
              <div
                className="d-none d-md-block bg"
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "340px",
                  
                }}
              >
                {/* <table className='table table-bordered' style={{ backgroundColor: '#8480DE' }}> */}
                <table
                  className="table table-bordered custom-table"
                  style={{ maxHeight: "100px" }}
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Added</th>
                      <th>Due</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            textDecoration: item.isDone
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.title}
                        </td>
                        <td
                          style={{
                            textDecoration: item.isDone
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.description}
                        </td>
                        <td>{formDate(item.date)}</td>
                        <td>{formDate(item.dueDate)}</td>
                        <td>
                          {/* <input
                                                    type="checkbox"
                                                    name='isDone'
                                                    checked={item.isDone || false}
                                                    onChange={() => toggleDone(item)}
                                                    /> */}
                          <Tooltip
                            title="Edit Task"
                            arrow
                            placement="bottom"
                            sx={{
                              fontSize: "1rem",
                            }}
                          >
                            <IconButton
                              aria-label="edit"
                              className="edit"
                              onClick={() => editTodo(item)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Delete Task"
                            arrow
                            placement="bottom"
                            sx={{
                              fontSize: "1rem",
                            }}
                          >
                            <IconButton
                              className="text-danger"
                              onClick={() => deleteInfo(item._id)}
                            >
                              <DeleteIcon sx={{ fontSize: 24 }} />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="d-md-none bg"
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "400px",
                }}
              >
                <table
                  className="table table-bordered custom-table"
                  style={{ minWidth: "768px", minHeight: '300px' }}
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Added</th>
                      <th>Due</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            textDecoration: item.isDone
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.title}
                        </td>
                        <td
                          style={{
                            textDecoration: item.isDone
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.description}
                        </td>
                        <td>{formDate(item.date)}</td>
                        <td>{formDate(item.dueDate)}</td>
                        <td>
                          {/* <input
                            type="checkbox"
                            name='isDone'
                            checked={item.isDone || false}
                            onChange={() => toggleDone(item)}
                            /> */}
                          <Tooltip
                            title="Edit Task"
                            arrow
                            placement="bottom"
                            sx={{
                              fontSize: "1rem",
                            }}
                          >
                            <IconButton
                              aria-label="edit"
                              className="edit"
                              onClick={() => editTodo(item)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Delete Task"
                            arrow
                            placement="bottom"
                            sx={{
                              fontSize: "1rem",
                            }}
                          >
                            <IconButton
                              className="text-danger"
                              onClick={() => deleteInfo(item._id)}
                            >
                              <DeleteIcon sx={{ fontSize: 24 }} />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEdit}
          todo={selectedTodo}
        />
      </main>
    </>
  );
};

export default Home;
