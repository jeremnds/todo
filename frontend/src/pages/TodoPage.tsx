import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { TodosType } from "../types/todo.type";

export default function TodoPage() {
  const [todos, setTodos] = useState<TodosType | []>([]);
  const url = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/todos`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setTodos(data);
        navigate("/todos");
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [url, navigate]);

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
    setText: (val: string) => void,
  ) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${url}/api/todos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the task");
      }
      const data = await response.json();
      setText("");
      const newTodos = [data, ...todos];
      setTodos(newTodos);
      console.log(newTodos);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      const response = await fetch(`${url}/api/todos/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const completeHandler = async (id: string, currentCompleted: boolean) => {
    try {
      const response = await fetch(`${url}/api/todos/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({ completed: !currentCompleted }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();

      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: updatedTodo.completed } : todo,
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Container>
      <div className="mx-auto my-28 max-w-xl">
        <TodoInput onSubmitHandler={submitHandler} />
        <TodoList
          todos={todos}
          isLoading={isLoading}
          onDelete={deleteHandler}
          onComplete={completeHandler}
        />
      </div>
    </Container>
  );
}
