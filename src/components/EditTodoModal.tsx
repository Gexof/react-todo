import type { FormEvent } from "react";
import type { ITodo } from "../interfaces";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import TextArea from "./ui/TextArea";

interface IEditTodoModal {
  open: boolean;
  onClose: () => void;
  todoToEdit: ITodo;
  onChangeHandler: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmitHandler: (evt: FormEvent<HTMLFormElement>) => void;
  isUpdating: boolean;
}

export default function EditTodoModal({
  open,
  onClose,
  todoToEdit,
  onChangeHandler,
  onSubmitHandler,
  isUpdating,
}: IEditTodoModal) {
  return (
    <Modal open={open} onClose={onClose} title="Edit task">
      <form onSubmit={onSubmitHandler} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-200">
            Task title
          </label>

          <Input
            label=""
            name="title"
            value={todoToEdit.title}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-200">
            Description
            <span className="ml-2 font-normal text-zinc-500">(Optional)</span>
          </label>

          <TextArea
            name="description"
            value={todoToEdit.description}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            onClick={onClose}
            className="w-full! bg-zinc-800! text-zinc-300! hover:bg-zinc-700! sm:w-auto!"
          >
            Cancel
          </Button>

          <Button
            isLoading={isUpdating}
            type="submit"
            className="w-full! sm:w-auto!"
          >
            Save changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
