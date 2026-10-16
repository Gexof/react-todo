import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

interface EditTodoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditTodoModal({ open, onClose }: EditTodoModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Edit Todo">
      <Input label="Edit Title" value="Edit Todo" />

      <Button>Update</Button>
      <Button>Cancel</Button>
    </Modal>
  );
}
