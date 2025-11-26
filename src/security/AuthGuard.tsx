import { Outlet } from "react-router-dom";

export default function AuthGuard() {
  /* TODO: Setup token and must login to access system */

  return <Outlet />;
}
