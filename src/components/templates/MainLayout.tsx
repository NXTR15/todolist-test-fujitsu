import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      {/* TODO: NAVBAR HERE*/}
      <main className="my-20">
        <Outlet />
      </main>
    </>
  );
}
