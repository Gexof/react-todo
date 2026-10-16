import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface IRemoveTodoModal {
  open: boolean;
  isRemoving: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const RemoveTodoModal = ({
  open,
  isRemoving,
  onClose,
  onRemove,
}: IRemoveTodoModal) => {
  return (
    <Modal
      open={open}
      title="Are you sure you want to remove this todo?"
      onClose={onClose}
    >
      <div className="flex items-center space-x-3">
        <Button isLoading={isRemoving} onClick={onRemove}>
          Yes, remove
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default RemoveTodoModal;
