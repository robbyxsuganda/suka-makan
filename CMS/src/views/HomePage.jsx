import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { baseURL } from "../constans/baseUrl";
import Preloader from "../components/Preloader";
import { rupiah } from "../../../Public/src/helpers/rupiah";
import Toastify from "toastify-js";

export default function HomePage() {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCuisines = async () => {
    try {
      setLoading(true);
      const { data } = await axios({
        url: baseURL + "/apis/restaurant-app/cuisines",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setCuisines(data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);

  async function handleDelete(cuisineId) {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: baseURL + `/apis/restaurant-app/cuisines/${cuisineId}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchCuisines();

      Toastify({
        text: data.message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }

  async function handleUpload(e, cuisineId) {
    try {
      setLoading(true);
      const images = e.target.files[0];
      const formData = new FormData();
      formData.append("file", images);

      const { data } = await axios({
        method: "PATCH",
        url: baseURL + `/apis/restaurant-app/cuisines/${cuisineId}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchCuisines();

      Toastify({
        text: data.message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <>
      {loading ? (
        <>
          <Preloader />
        </>
      ) : (
        <>
          {/* Product Section */}
          <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="product-section">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="display-2">Cuisines</h1>
              <Link to={"/add-cuisine"}>
                <button className="btn btn-primary rounded-pill" id="new-product">
                  <span className="icon material-symbols-outlined">add</span>
                  New Cuisine
                </button>
              </Link>
            </div>
            <div className="row">
              <div className="col-12 table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col" width="180px">
                        Image
                      </th>
                      <th scope="col" width="250px">
                        Description
                      </th>
                      <th scope="col">Price</th>
                      <th scope="col">Email</th>
                      <th scope="col">Author</th>
                      <th scope="col" width="50px" />
                    </tr>
                  </thead>
                  <tbody id="table-product">
                    {cuisines.map((c) => (
                      <tr key={c.id}>
                        <td scope="row">{c.id}</td>
                        <td className="fw-bold">{c?.name}</td>
                        <td>
                          <img src={c?.imgUrl} className="img-fluid" />
                        </td>
                        <td>{c?.description}</td>
                        <td className="fw-bold">{rupiah(c?.price)}</td>
                        <td>{c?.User?.email}</td>
                        <td>
                          <span className="d-flex">
                            <a className="ms-3" role="button" style={{ cursor: "pointer" }} onClick={() => handleDelete(c?.id)}>
                              <span className="icon material-symbols-outlined text-danger">delete</span>
                            </a>

                            <Link to={`/edit-cuisine/${c?.id}`} className="ms-3">
                              <span className="icon material-symbols-outlined text-danger">edit</span>
                            </Link>

                            {loading ? (
                              <Preloader />
                            ) : (
                              <>
                                <label className="icon material-symbols-outlined text-danger ms-3" htmlFor={`uploadFile${c?.id}`} style={{ cursor: "pointer" }}>
                                  upload
                                </label>
                                <input type="file" id={`uploadFile${c?.id}`} className="d-none" onChange={(e) => handleUpload(e, c?.id)} />
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          {/* End Product Section */}
        </>
      )}
    </>
  );
}
