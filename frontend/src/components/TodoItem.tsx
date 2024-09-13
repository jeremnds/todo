import { cn } from "@/lib/utils";
import { TodoType } from "@/types/todo.type";
import { Check, Trash2, X } from "lucide-react";

type TodoItemProps = {
  item: TodoType;
  onDelete: (id: string) => void;
  onComplete: (id: string, completed: boolean) => void;
};

export default function TodoItem({
  item,
  onDelete,
  onComplete,
}: TodoItemProps) {
  return (
    <div
      className={cn(
        "my-2 flex justify-between rounded-md border border-gray-400 px-4 py-4",
        item.completed && "border-green-400",
      )}
    >
      <p className={cn(item.completed && "line-through")}>{item.title}</p>
      <div className="flex items-center gap-2">
        <div
          onClick={() => onComplete(item._id, item.completed)}
          className="hover:cursor-pointer"
        >
          {item.completed ? (
            <Check className="text-green-600" />
          ) : (
            <X className="text-red-600" />
          )}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={() => onDelete(item._id)}
        >
          <Trash2 className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
