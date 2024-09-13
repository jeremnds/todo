import { cn } from "@/lib/utils";
import { TodosType } from "@/types/todo.type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import TodoItem from "./TodoItem";
import { Button } from "./ui/button";

type TodoListProps = {
  todos: TodosType;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onComplete: (id: string, completed: boolean) => void;
};

export default function TodoList({
  todos,
  isLoading,
  onDelete,
  onComplete,
}: TodoListProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
    "all",
  );

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  if (isLoading)
    return (
      <Loader2 className="mx-auto mt-24 h-8 w-8 animate-spin text-white" />
    );
  if (!todos.length)
    return <p className="mt-12 text-center">Start to add your tasks</p>;

  return (
    <div className="mt-4 rounded-lg border border-gray-200 p-6">
      <div className="flex gap-2">
        <Button
          className={cn(
            "h-6 rounded-full",
            filter === "all" &&
              "bg-gray-500 text-gray-300 hover:bg-gray-500 hover:text-gray-300",
          )}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          className={cn(
            "h-6 rounded-full",
            filter === "completed" &&
              "bg-gray-500 text-gray-300 hover:bg-gray-500 hover:text-gray-300",
          )}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          className={cn(
            "h-6 rounded-full",
            filter === "uncompleted" &&
              "bg-gray-500 text-gray-300 hover:bg-gray-500 hover:text-gray-300",
          )}
          onClick={() => setFilter("uncompleted")}
        >
          Uncompleted
        </Button>
      </div>
      <div className="mt-8">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            item={todo}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  );
}
