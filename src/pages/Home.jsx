import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaDownload, FaPlus, FaSearch } from "react-icons/fa";
import { BsColumns } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [todoModal, setTodoModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: "",
    category: "",
    isCommentable: false,
  });
  const [searchTerms, setSearchTerms] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/sign-up");
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleCreateTodoModal = () => {
    setTodoModal(!todoModal);
    setEditTodo(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const addOrUpdateTodo = () => {
    if (editTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, ...newTodo } : todo
        )
      );
    } else {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          ...newTodo,
          completed: false,
          publishedAt: Date.now(),
        },
      ]);
    }
    setTodoModal(false);
    setNewTodo({ title: "", category: "", isCommentable: false });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const openEditModal = (todo) => {
    setNewTodo({
      title: todo.title,
      category: todo.category,
      isCommentable: todo.isCommentable,
    });
    setEditTodo(todo);
    setTodoModal(true);
  };

  const filteredTodos = searchTerms
    ? todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerms.toLowerCase())
      )
    : todos;

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="border-l border-zinc-700 w-full">
        <div className="flex items-center md:justify-between border-b border-zinc-700 md:px-6 px-3 py-3 w-full flex-col md:flex-row space-y-6 md:space-y-0 justify-center">
          <div className="flex items-center relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              className="pl-2 rounded-md flex py-2 bg-gray-200 items-center pe-10 w-full md:w-auto"
            />
            <FaSearch
              onClick={() => {}}
              className="absolute right-3 text-gray-600 cursor-pointer"
            />
          </div>
          <div className="flex items-center space-x-4 text-[16px] font-semibold text-blue-500">
            <div className="hover:cursor-not-allowed hidden lg:flex gap-x-2 items-center">
              <BsColumns />
              <p>Columns</p>
            </div>
            <div className="flex gap-x-2 items-center hover:cursor-not-allowed">
              <FiFilter />
              <p>
                <span className="md:inline hidden">Add</span> Filter
              </p>
            </div>
            <div
              onClick={toggleCreateTodoModal}
              className="flex gap-x-2 items-center cursor-pointer"
            >
              <FaPlus />
              <p>Create</p>
            </div>
            <div className="hover:cursor-not-allowed flex gap-x-2 items-center">
              <FaDownload />
              <p>Download</p>
            </div>
          </div>
        </div>

        <div className="py-6 md:px-6 px-3">
          {filteredTodos.length === 0 ? (
            <div className="flex flex-col items-center space-y-8">
              <p className="text-center text-gray-500">
                No todos found. Create a new one.
              </p>
              <button
                onClick={toggleCreateTodoModal}
                className="px-6 py-2 bg-blue-500 rounded-md text-white "
              >
                Create TO-DO{" "}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-left text-gray-700">
                    <th className="py-2 px-4">Completed</th>
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Category</th>
                    <th className="py-2 px-4">Published At</th>
                    <th className="py-2 px-4">Commentable</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.map((todo) => (
                    <tr
                      key={todo.id}
                      className={`border-b ${
                        todo.completed ? "bg-blue-100" : ""
                      }`}
                    >
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id)}
                          className="form-checkbox h-5 w-5 text-green-500"
                        />
                      </td>
                      <td
                        className={`py-2 px-4 ${
                          todo.completed ? "line-through" : ""
                        }`}
                      >
                        {todo.title}
                      </td>
                      <td className="py-2 px-4">{todo.category}</td>
                      <td className="py-2 px-4">
                        {new Date(todo.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">
                        {todo.isCommentable ? "Yes" : "No"}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => openEditModal(todo)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {todoModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {editTodo ? "Edit Todo" : "Create New Todo"}
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTodo.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter todo title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newTodo.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter category"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Commentable</label>
                <select
                  name="isCommentable"
                  value={newTodo.isCommentable}
                  onChange={(e) =>
                    setNewTodo({
                      ...newTodo,
                      isCommentable: e.target.value === "true",
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setTodoModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrUpdateTodo}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {editTodo ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
