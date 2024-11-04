import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="text-center p-4 text-black flex gap-2 justify-between">
      <div className="uppercase font-bold text-xl ">
        <NavLink to="/">
          <h1>#vanlife</h1>
        </NavLink>
      </div>
      <nav className="flex gap-2">
      <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="/host"
        >
          Host
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="/vans"
        >
          Vans
        </NavLink>
        
      </nav>
    </header>
  );
}
