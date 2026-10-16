import { useState, type FormEvent } from "react";
import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import EditTodoModal from "./EditTodoModal";
import type { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import RemoveTodoModal from "./RemoveTodoModal";

const TodoList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    documentId: "0",
    title: "",
    description: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todoList", todoToEdit.documentId],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // ** Handlers Edit Modal
  const onOpenEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const onCloseEditModal = () => {
    setTodoToEdit({
      documentId: "0",
      title: "",
      description: "",
    });
    setIsEditModalOpen(false);
  };

  const onChangeHandler = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = evt.target;
    setTodoToEdit({ ...todoToEdit, [name]: value });
  };

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsUpdating(true);

    const { title, description } = todoToEdit;
    try {
      await axiosInstance.put(
        `/todos/${todoToEdit.documentId}`,
        { data: { title, description } },
        { headers: { Authorization: `Bearer ${userData.jwt}` } },
      );

      onCloseEditModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  // ** Handlers Remove Modal
  const onRemoveHandler = () => {
    setIsRemoving(true);
  };

  if (isLoading) return <h3>Loading ..</h3>;

  return (
    <div className="space-y-1">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.documentId}
            className="flex items-center justify-between p-3 rounded-md"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center  justify-end w-full space-x-3">
              <Button onClick={() => onOpenEditModal(todo)}>Edit</Button>
              <Button>Delete</Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No Todos Yet</h3>
      )}

      <EditTodoModal
        open={isEditModalOpen}
        onClose={onCloseEditModal}
        todoToEdit={todoToEdit}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        isUpdating={isUpdating}
      />

      <RemoveTodoModal
        open={isRemoveModalOpen}
        isRemoving={isRemoving}
        onClose={() => setIsRemoveModalOpen(false)}
        onRemove={onRemoveHandler}
      />
    </div>
  );
};

export default TodoList;
