export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  category: "Produtive" | "Personal" | "Others";
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
