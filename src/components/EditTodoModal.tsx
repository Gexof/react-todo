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
    <Modal open={open} onClose={onClose} title="Edit Todo">
      <form onSubmit={onSubmitHandler}>
        <Input
          label="Edit Title"
          name="title"
          value={todoToEdit.title}
          onChange={onChangeHandler}
        />

        <TextArea
          name="description"
          value={todoToEdit.description}
          onChange={onChangeHandler}
        />

        <Button isLoading={isUpdating} type="submit">
          Update
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </Modal>
  );
}
