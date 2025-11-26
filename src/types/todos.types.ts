export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  category: "Productive" | "Personal" | "Others";
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
