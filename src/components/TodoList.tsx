import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import EditTodoModal from "./EditTodoModal";
import type { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import RemoveTodoModal from "./RemoveTodoModal";
import TodoSkeleton from "./TodoSkelton";
import AddTodoModal from "./AddTodoModal";
import axios from "axios";
// import { faker } from "@faker-js/faker";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // States
  const [queryVersion, setQueryVersion] = useState(1);

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

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todoList", `${queryVersion}`],
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
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.documentId}`,
        { data: { title, description } },
        { headers: { Authorization: `Bearer ${userData.jwt}` } },
      );

      if (status === 200) {
        onCloseEditModal();
        setQueryVersion((prev) => prev + 1);
      }
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
      const { status } = await axiosInstance.delete(
        `/todos/${todoToEdit.documentId}`,
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );

      if (status === 200) {
        setIsRemoveModalOpen(false);
        setQueryVersion((prev) => prev + 1);
      }
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
    setTodoToAdd({
      title: "",
      description: "",
    });
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
        {
          data: {
            title,
            description,
            users_permissions_user: [userData.user.id],
          },
        },
        { headers: { Authorization: `Bearer ${userData.jwt}` } },
      );

      onCloseAddModal();
      setQueryVersion((prev) => prev + 1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data); // the full Strapi error
        console.log(error.response?.data?.error?.message);
      }
    } finally {
      setIsAdding(false);
    }
  };

  // ** Generate Todos Handler
  // const onGenerateTodos = async () => {
  //   for (let i = 0; i < 100; i++) {
  //     try {
  //       await axiosInstance.post(
  //         `/todos`,
  //         {
  //           data: {
  //             title: faker.word.words(5),
  //             description: faker.lorem.paragraph(2),
  //             users_permissions_user: [userData.user.id],
  //           },
  //         },
  //         { headers: { Authorization: `Bearer ${userData.jwt}` } },
  //       );
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.log(error.response?.data); // the full Strapi error
  //         console.log(error.response?.data?.error?.message);
  //       }
  //     }
  //   }
  // };

  const todos: ITodo[] = data?.todos ?? [];

  const todosWithDescription = todos.filter((todo) =>
    todo.description?.trim(),
  ).length;

  const quickTasks = todos.length - todosWithDescription;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-3 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="h-8 w-40 animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-64 max-w-full animate-pulse rounded bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50"
            />
          ))}
        </div>

        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <TodoSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 pb-10">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Personal workspace
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            My tasks
          </h1>

          <p className="text-sm leading-6 text-zinc-400">
            Keep track of what matters, one task at a time.
          </p>
        </div>

        <Button
          type="button"
          onClick={onOpenAddModal}
          className="!w-full gap-2 rounded-lg border-indigo-400/20 px-4 sm:!w-auto"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4"
            aria-hidden="true"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add task
        </Button>
      </section>

      {/* Overview */}
      <section
        aria-label="Task overview"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">Total tasks</p>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 text-zinc-500"
              aria-hidden="true"
            >
              <path
                d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">
            {todos.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Tasks in your workspace</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">With details</p>
            <span className="size-2 rounded-full bg-indigo-400" />
          </div>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">
            {todosWithDescription}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Tasks with a description</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">Quick tasks</p>
            <span className="size-2 rounded-full bg-zinc-500" />
          </div>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">
            {quickTasks}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Tasks without a description
          </p>
        </div>
      </section>

      {/* Todo list */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-100">
              Your tasks
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Manage your tasks and their details.
            </p>
          </div>

          <span className="shrink-0 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-400">
            {todos.length} {todos.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {todos.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
            {todos.map((todo, index) => (
              <article
                key={todo.documentId}
                className={`group flex min-w-0 items-start gap-3 p-4 transition-colors hover:bg-zinc-900/80 sm:items-center sm:gap-4 ${
                  index !== todos.length - 1
                    ? "border-b border-zinc-800/80"
                    : ""
                }`}
              >
                <div className="mt-1.5 flex size-4 shrink-0 items-center justify-center rounded border border-zinc-600 text-transparent transition-colors group-hover:border-indigo-400 sm:mt-0">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-3"
                    aria-hidden="true"
                  >
                    <path
                      d="m3 8 3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">
                    {todo.title}
                  </h3>

                  {todo.description?.trim() ? (
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-500">
                      {todo.description}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-zinc-600">No description</p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => onOpenEditModal(todo)}
                    aria-label={`Edit ${todo.title}`}
                    title="Edit task"
                    className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-[17px]"
                      aria-hidden="true"
                    >
                      <path
                        d="m15 5 4 4M4 20l4-.8L19.4 7.8a2.1 2.1 0 0 0-3-3L5 16.2 4 20Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenRemoveModal(todo)}
                    aria-label={`Delete ${todo.title}`}
                    title="Delete task"
                    className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-[17px]"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 px-5 py-14 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-6"
                aria-hidden="true"
              >
                <path
                  d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-sm font-semibold text-zinc-200">
              No tasks yet
            </h3>

            <p className="mt-1 max-w-xs text-sm leading-6 text-zinc-500">
              Start with one small task. You can add more whenever you need.
            </p>

            <Button
              type="button"
              onClick={onOpenAddModal}
              className="!w-auto mt-5 gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Create your first task
            </Button>
          </div>
        )}
      </section>

      <AddTodoModal
        open={isAddModalOpen}
        isAdding={isAdding}
        onClose={onCloseAddModal}
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
    </main>
  );
};

export default TodoList;
