import { Route, Routes } from "react-router-dom";
import TodosPage from "../components/pages/TodosPage";
import MainLayout from "../components/templates/MainLayout";
import NotFoundPage from "../components/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TodosPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
