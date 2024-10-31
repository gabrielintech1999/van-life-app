import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="text-center p-4 text-black flex gap-2 justify-between">
      <div className="uppercase font-bold text-xl ">
        <Link to="/">
          <h1>#vanlife</h1>
        </Link>
      </div>
      <nav className="flex gap-2">
        <Link to="/about">About</Link>
        <Link to="/vans">Vans</Link>
      </nav>
    </header>
  );
}
