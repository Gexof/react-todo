import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-zinc-100"
        >
          <span className="text-xl text-indigo-400">◆</span>
          <span>MyApp</span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className="rounded-lg px-3 py-1.5 text-sm font-medium transition text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100"
          >
            Home
          </NavLink>
        </div>

        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      </nav>
    </header>
  );
};

export default Navbar;
