import type { FormEvent } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import TextArea from "./ui/TextArea";

interface IAddTodoModal {
  open: boolean;
  onClose: () => void;
  onChangeHandler: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmitHandler: (evt: FormEvent<HTMLFormElement>) => void;
  isAdding: boolean;
  todoToAdd: {
    title: string;
    description: string;
  };
}

const AddTodoModal = ({
  open,
  onClose,
  onChangeHandler,
  onSubmitHandler,
  isAdding,
  todoToAdd,
}: IAddTodoModal) => {
  return (
    <Modal open={open} onClose={onClose} title="Create a task">
      <form onSubmit={onSubmitHandler} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-200">
            Task title
          </label>

          <Input
            label=""
            name="title"
            value={todoToAdd.title}
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
            value={todoToAdd.description}
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
            isLoading={isAdding}
            type="submit"
            className="w-full! sm:w-auto!"
          >
            Create task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTodoModal;
