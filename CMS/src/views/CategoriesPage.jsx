import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../constans/baseUrl";
import Preloader from "../components/Preloader";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios({
        url: baseURL + "/apis/restaurant-app/categories",
        method: "GET",
        headers: {
          Authorization: `Berear ${localStorage.access_token}`,
        },
      });
      // console.log(data, "ini di fetch");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Preloader />
        </>
      ) : (
        <>
          {/* Category Section */}
          <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="category-section">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="display-2">Categories</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                    </tr>
                  </thead>
                  <tbody id="table-category">
                    {categories.map((c) => (
                      <tr key={c.id}>
                        <td scope="row">{c.id}</td>
                        <td className="fw-bold">{c.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          {/* End Category Section */}
        </>
      )}
    </>
  );
}
