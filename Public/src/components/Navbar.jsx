import { Link } from "react-router";

export default function Navbar({ setSearch }) {
  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold">Suka Makan</h1>
            </Link>
          </div>
          <div>
            <input type="search" placeholder="Search..." className="border px-4 py-2 rounded" onChange={(e) => setSearch(e.target.value)} />
            <button className="border-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">Search</button>
          </div>
        </div>
      </nav>
    </>
  );
}
