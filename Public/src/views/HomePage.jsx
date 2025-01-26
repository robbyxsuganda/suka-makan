import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../constans/baseUrl";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import gifLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [cuisines, setCuisnes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  async function fetchCuisines() {
    try {
      setLoading(true);
      const isSort = sort || "ASC";
      const { data } = await axios({
        method: "GET",
        url: baseURL + `/apis/pub/restaurant-app/cuisines?q=${search}&i=${filter}&limit=9&page=${page}&sort=${isSort}`,
      });

      // console.log(data);

      setTotalPage(data.data.pagination.totalPage);
      setCuisnes(data.data.query);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseURL + `/apis/pub/restaurant-app/categories`,
      });

      // console.log(data);

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
    fetchCuisines();
  }, [search]);

  useEffect(() => {
    fetchCuisines();
  }, [search, page, filter, sort]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar setSearch={setSearch} />

        {/* Content */}
        <div className="container mx-auto mt-8 flex-grow">
          {/* Awal Sorting and Filtering */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">Our Menu</h2>
            </div>
            <div>
              {/* Order By ASC / DESC */}
              <select name="sort" id="sort" className="border px-2 py-1 mr-5" onChange={(e) => setSort(e.target.value)} value={sort || "DEFAULT"}>
                <option value="DEFAULT" hidden disabled>
                  Order By
                </option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>

              {/* Filter By Category */}
              <select value={filter || "DEFAULT"} name="filter" id="filter" className="border px-2 py-1 " onChange={(e) => setFilter(e.target.value)}>
                <option value="DEFAULT" disabled hidden>
                  Select Category
                </option>
                {categories.map((c) => (
                  <option key={c?.id} value={c?.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Akhir Sort and Filtering */}

          {loading ? (
            <>
              <div className="flex justify-center mt-28">
                <img src={gifLoading} className="w-1/5" />
              </div>
            </>
          ) : (
            <>
              {/* Menu List */}
              {cuisines.length === 0 ? (
                <div className="flex text-center justify-center items-center mt-8 h-96">
                  <p className="text-lg font-semibold">Data tidak ditemukan</p>
                </div>
              ) : (
                <>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {cuisines.map((cuisine) => {
                      return <Card cuisine={cuisine} key={cuisine?.id} />;
                    })}
                  </div>
                  <Pagination page={page} setPage={setPage} totalPage={totalPage} />
                </>
              )}

              {/* Akhir Menu List */}
            </>
          )}
        </div>
        {/* Akhir Content */}
        <Footer />
      </div>
    </>
  );
}
