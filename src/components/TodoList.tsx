import { useState } from "react";
import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  console.log(data);

  if (isLoading) return <h3>Loading ..</h3>;

  return (
    <div className="space-y-1">
      {data.todos.length ? (
        data.todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-3 rounded-md"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center  justify-end w-full space-x-3">
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No Todos Yet</h3>
      )}
    </div>
  );
};

export default TodoList;
