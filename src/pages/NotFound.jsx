import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Oops — the page you are looking for doesn't exist.</p>
        <Link to="/" className="px-4 py-2 bg-sky-600 text-white rounded-md">Back to Home</Link>
      </div>
    </div>
  );
}
