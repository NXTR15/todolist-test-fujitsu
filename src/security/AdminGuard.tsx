import { Outlet } from "react-router-dom";

export default function AdminGuard() {
  /* TODO: Admin only page limitation */

  return <Outlet />;
}
