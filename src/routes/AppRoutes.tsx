import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage";
import AuthGuard from "../security/AuthGuard";
import MainLayout from "../components/templates/MainLayout";
import AdminGuard from "../security/AdminGuard";
import NotFoundPage from "../components/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
      <Route element={<AuthGuard />}>
        <Route path="/" element={<MainLayout />}>
          {/* TODO: USER SECTION PAGES */}
          <Route element={<AdminGuard />}>
            {/* TODO: ADMIN SECTION PAGES */}
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
