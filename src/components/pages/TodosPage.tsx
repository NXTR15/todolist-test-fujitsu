import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  addTodoRequest,
  deleteTodoRequest,
  fetchTodosByStatusRequest,
  fetchTodosRequest,
  updateTodoRequest,
} from "../../store/slices/todoSlice";

export default function TodosPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todo
  );
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoUserId, setNewTodoUserId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [selectStatus, setSelectStatus] = useState<string>("All");

  const addTodo = () => {
    if (newTodoTitle.trim() === "") alert("Title cannot be empty");
    if (newTodoUserId === null) return;
    dispatch(
      addTodoRequest({
        id: todos.length + 1,
        userId: newTodoUserId,
        title: newTodoTitle,
        completed: false,
        category: "Others",
      })
    );
    setNewTodoTitle("");
    setNewTodoUserId(null);
  };

  function isTaskDone(id: number) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      dispatch(
        updateTodoRequest({
          id: updatedTodo.id,
          title: updatedTodo.title,
          completed: updatedTodo.completed,
          category: updatedTodo.category,
        })
      );
    }
  }

  function removeTodo(id: number) {
    dispatch(deleteTodoRequest(id));
  }

  const loadTodos = () => {
    if (selectStatus === "All") {
      dispatch(fetchTodosRequest());
    } else if (selectStatus === "true") {
      dispatch(fetchTodosByStatusRequest(true));
    } else if (selectStatus === "false") {
      dispatch(fetchTodosByStatusRequest(false));
    }
  };

  const saveUpdate = (id: number) => {
    if (editingTitle.trim() === "") {
      alert("Title cannot be empty");
      return;
    }
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, title: editingTitle };
      dispatch(
        updateTodoRequest({
          id: updatedTodo.id,
          title: updatedTodo.title,
          completed: updatedTodo.completed,
          category: updatedTodo.category,
        })
      );
    }
    setEditingId(null);
  };

  useEffect(() => {
    loadTodos();
  }, [dispatch]);

  return (
    <div>
      <div>
        <select
          value={selectStatus === null ? "" : selectStatus}
          onChange={(e) => setSelectStatus(e.target.value)}
          className="mr-5"
        >
          <option value="All">All</option>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>
        <button
          onClick={loadTodos}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-5"
        >
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div className="flex flex-row gap-2">
            <input
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="New todo"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />
            <input
              type="number"
              value={newTodoUserId ?? ""}
              onChange={(e) => setNewTodoUserId(Number(e.target.value))}
              placeholder="User id"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
          <table className="w-screen md:table-fixed overflow-hidden table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-lg font-semibold">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-lg font-semibold">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-lg font-semibold">
                  Status
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.slice(0, 20).map((todo) => (
                <tr key={todo.id} className="border-t">
                  {editingId === todo.id ? (
                    <td className="px-4 py-2">
                      <input
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                      />
                    </td>
                  ) : (
                    <td className="px-4 py-2">{todo.title}</td>
                  )}
                  <td className="px-4 py-2">{todo.category}</td>
                  <td className="px-4 py-2">
                    <button
                      className={
                        todo.completed
                          ? "bg-blue-500 text-white py-2 px-4 rounded min-w-[120px]"
                          : "bg-red-500 text-white py-2 px-4 rounded min-w-[120px]"
                      }
                      onClick={() => {
                        isTaskDone(todo.id);
                      }}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </button>
                  </td>
                  {editingId === todo.id ? (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => saveUpdate(todo.id)}
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-5"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  ) : (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingId(todo.id);
                          setEditingTitle(todo.title);
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-5"
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={() => {
                          removeTodo(todo.id);
                        }}
                      >
                        Delete!
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
