const TodoSkeleton = () => {
  return (
    <div
      className="flex items-center justify-between p-3 rounded-md animate-pulse"
      aria-hidden="true"
    >
      {/* title */}
      <div className="w-full">
        <div className="h-4 w-1/3 rounded-full bg-zinc-800" />
      </div>

      {/* Edit + Delete buttons */}
      <div className="flex items-center justify-end w-full space-x-3">
        <div className="h-10 flex-1 rounded-xl bg-zinc-800" />
        <div className="h-10 flex-1 rounded-xl bg-zinc-800" />
      </div>
    </div>
  );
};

export default TodoSkeleton;
