import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import EditTodoModal from "./EditTodoModal";
import type { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import RemoveTodoModal from "./RemoveTodoModal";
import TodoSkeleton from "./TodoSkelton";
import AddTodoModal from "./AddTodoModal";

const TodoList = () => {
  // States

  // Open Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    documentId: "0",
    title: "",
    description: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Remove Modal States
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Add Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [todoToAdd, setTodoToAdd] = useState({
    title: "",
    description: "",
  });

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
  const onOpenRemoveModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsRemoveModalOpen(true);
  };

  const onRemoveHandler = async () => {
    setIsRemoving(true);

    try {
      await axiosInstance.delete(`/todos/${todoToEdit.documentId}`, {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });

      setIsRemoveModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRemoving(false);
    }
  };

  // ** Hanlder Add Modal
  const onOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const onCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const onChangeAddHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = evt.target;

    setTodoToAdd({ ...todoToAdd, [name]: value });
  };

  const onSubmitAddHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsAdding(true);

    const { title, description } = todoToAdd;

    try {
      await axiosInstance.post(
        `/todos`,
        { data: { title, description } },
        { headers: { Authorization: `Bearer ${userData.jwt}` } },
      );

      onCloseAddModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading)
    return (
      <div className="space-y-1">
        {Array.from({ length: 3 }, (_, i) => (
          <TodoSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <div className="space-y-1">
      <Button onClick={onOpenAddModal}>Add Todo</Button>

      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.documentId}
            className="flex items-center justify-between p-3 rounded-md"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center  justify-end w-full space-x-3">
              <Button onClick={() => onOpenEditModal(todo)}>Edit</Button>
              <Button onClick={() => onOpenRemoveModal(todo)}>Delete</Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No Todos Yet</h3>
      )}

      <AddTodoModal
        open={isAddModalOpen}
        isAdding={isAdding}
        onClose={onCloseEditModal}
        onSubmitHandler={onSubmitAddHandler}
        onChangeHandler={onChangeAddHandler}
        todoToAdd={todoToAdd}
      />

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
