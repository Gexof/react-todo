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
    <Modal open={open} onClose={onClose} title="Add new Todo">
      <form onSubmit={onSubmitHandler}>
        <Input
          label="Edit Title"
          name="title"
          value={todoToAdd.title}
          onChange={onChangeHandler}
        />

        <TextArea
          name="description"
          value={todoToAdd.description}
          onChange={onChangeHandler}
        />

        <Button isLoading={isAdding} type="submit">
          Update
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </Modal>
  );
};

export default AddTodoModal;
