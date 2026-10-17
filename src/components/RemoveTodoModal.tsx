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
    <Modal open={open} title="Delete task" onClose={onClose}>
      <div className="mt-4 space-y-6">
        <div>
          <p className="text-sm leading-6 text-zinc-400">
            Are you sure you want to delete this task?
            <span className="mt-1 block text-zinc-500">
              This action cannot be undone.
            </span>
          </p>
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
            type="button"
            isLoading={isRemoving}
            onClick={onRemove}
            className="w-full! bg-red-600! text-white! hover:bg-red-500! sm:w-auto!"
          >
            Delete task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveTodoModal;
