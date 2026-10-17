import { Link, NavLink, useLocation } from "react-router";
import Button from "./ui/Button";

const Navbar = () => {
  const { pathname } = useLocation();

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const onLogout = () => {
    localStorage.removeItem(storageKey);
    location.replace(pathname);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70",
      isActive
        ? "bg-zinc-800 text-zinc-100"
        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
    ].join(" ");

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          to="/"
          aria-label="Taskly home"
          className="group flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/15">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-4.5"
              aria-hidden="true"
            >
              <path
                d="m5 12 4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            Taskly
          </span>
        </Link>

        {userData ? (
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </div>

            <div className="h-6 w-px bg-zinc-800" aria-hidden="true" />

            <Button
              type="button"
              onClick={onLogout}
              className="w-auto! cursor-pointer rounded-md border-transparent bg-transparent px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 active:bg-zinc-800"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  d="M10 17l5-5-5-5M15 12H3m9-8h6a2 2 0 012 2v12a2 2 0 01-2 2h-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                [
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-100",
                ].join(" ")
              }
            >
              Login
            </NavLink>

            <Link
              to="/register"
              className="rounded-md border border-indigo-400/20 bg-indigo-500 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Get started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
