import axios from "axios";
import { baseURL } from "../constans/baseUrl";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import gifLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import { rupiah } from "../helpers/rupiah";

export default function DetailPage() {
  const navigate = useNavigate();
  const [cuisine, setCuisine] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function fetchCuisine() {
    try {
      setLoading(true);
      const { data } = await axios({
        url: baseURL + `/apis/pub/restaurant-app/cuisines/${id}`,
        method: "GET",
      });

      // console.log(data.data);

      setCuisine(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCuisine();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <>
          <div className="flex justify-center mt-28">
            <img src={gifLoading} className="w-1/5" />
          </div>
        </>
      ) : (
        <>
          {/* Awal Detail Product */}
          <div className="container mx-auto mt-8 flex-grow">
            <div className="flex bg-white border-1 p-10 gap-10 rounded-md shadow-md items-stretch">
              <div className="h-full w-1/2 flex">
                <img src={cuisine?.imgUrl} alt="Espresso" className="object-cover w-full rounded-md" />
              </div>
              <div className="h-full w-1/2 flex flex-col justify-between gap-4">
                <h3 className="text-xl font-bold">Kategory: {cuisine?.Category?.name}</h3>
                <h3 className="text-3xl font-bold">{cuisine?.name}</h3>
                <p className="text-gray-700">Description : {cuisine?.description}</p>
                <p className="text-2xl font-semibold">{rupiah(cuisine?.price)}</p>
                <p className="text-l font-semibold">By: {cuisine?.User?.username}</p>
                <p className="text-l font-semibold">Email: {cuisine?.User?.email}</p>
                <p className="text-l font-semibold">Address: {cuisine?.User?.address}</p>
                <button onClick={() => navigate("/")} className="border-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">
                  Back
                </button>
              </div>
            </div>
          </div>
          {/* Akhir Detail Product */}
        </>
      )}
    </>
  );
}
