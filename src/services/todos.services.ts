import type { Todo } from "../types/todos.types";
import { api } from "../utils/api.config";

export async function getTodos(): Promise<Todo[]> {
  const response = await api.get("/todos");

  const categories = ["Productive", "Personal", "Others"] as const;

  const categorizedTodos: Todo[] = response.data.map(
    (td: Todo, index: number) => {
      const category = categories[index % categories.length];

      return {
        ...td,
        category,
      };
    }
  );

  return categorizedTodos;
}

export async function addTodo(payload: {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  category: "Productive" | "Personal" | "Others";
}): Promise<Todo> {
  const response: Todo = {
    id: payload.id,
    userId: payload.userId,
    title: payload.title,
    completed: payload.completed,
    category: payload.category,
  };

  const postedData = await api.post("/todos", response);

  return postedData.data;
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const response = todo;
  return response;
}

export async function deleteTodo(id: number): Promise<Number> {
  const response = id;
  return response;
}
