import { NavLink, Outlet } from "react-router-dom";

function HostLayout() {
  return (
    <main className="min-h-screen">
      <nav className="flex gap-2 p-4">
        <NavLink
          end 
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal") }
          to="/host"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="income"
        >
          Income
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="vans"
        >
          Vans
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </main>
  );
}

export default HostLayout;
