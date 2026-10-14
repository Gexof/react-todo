import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-center">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl shadow-black/50 backdrop-blur">
        <h1 className="text-5xl font-bold text-indigo-400">404</h1>
        <p className="mb-6 mt-2 text-sm text-zinc-400">
          This page doesn't exist.
        </p>
        <Link
          to="/"
          className="w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-[15px] font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 inline-block"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
