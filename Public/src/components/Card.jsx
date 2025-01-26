import { Link } from "react-router";
import { rupiah } from "../helpers/rupiah";

export default function Card({ cuisine }) {
  return (
    <>
      {/* Awal Product */}
      <div className="flex bg-white border-1 p-5 gap-5 rounded-md shadow-md items-stretch" key={cuisine?.id}>
        {/* Gambar */}
        <div className="h-full w-1/2 flex">
          <img src={cuisine?.imgUrl} alt={cuisine?.name} className="object-cover w-full rounded-md" />
        </div>
        {/* Detail Menu */}
        <div className="h-full w-1/2 flex flex-col justify-between gap-4">
          <h3 className="text-xl font-bold">{cuisine?.name}</h3>
          <p className="font-bold text-gray-700">Kategory: {cuisine?.Category?.name}</p>
          <p className="text-gray-700">{cuisine?.description}</p>
          <p className="text-lg font-semibold">{rupiah(cuisine?.price)}</p>
          <Link to={`/${cuisine?.id}`}>
            <button className="border-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">See Detail</button>
          </Link>
        </div>
      </div>
      {/* Akhir Product */}
    </>
  );
}
