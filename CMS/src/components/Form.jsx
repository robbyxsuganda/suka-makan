import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import { baseURL } from "../constans/baseUrl";
import Button from "./Button";
import { Link } from "react-router";

export default function Form({ cuisine, propName, handleSubmit }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  });

  function handleInput(fieldName, e) {
    let value = e.target.value;
    if (fieldName === "price" || fieldName === "categoryId") {
      value = +e.target.value;
    }

    setForm((oldValue) => {
      return {
        ...oldValue,
        [fieldName]: value,
      };
    });
  }

  async function fetchCategories() {
    try {
      const { data } = await axios({
        url: baseURL + "/apis/restaurant-app/categories",
        method: "GET",
        headers: {
          Authorization: `Berear ${localStorage.access_token}`,
        },
      });

      setCategories(data.data);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (cuisine) {
      delete cuisine?.authorId;
      delete cuisine?.createdAt;
      delete cuisine?.updatedAt;
      delete cuisine?.id;
      delete cuisine?.Category;
      delete cuisine?.User;
    }

    setForm((oldValue) => {
      return {
        ...oldValue,
        ...cuisine,
      };
    });
  }, [cuisine]);

  return (
    <>
      {/* New cuisine Section */}
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2"> {propName} </h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <form onSubmit={(e) => handleSubmit(e, form)} id="product-form">
              <div className="mb-3">
                <label htmlFor="product-name">
                  Name <span className="text-danger fw-bold">*</span>
                </label>
                <input onChange={(e) => handleInput("name", e)} type="text" className="form-control" id="product-name" placeholder="Enter product name" autoComplete="off" value={form?.name} required="" />
              </div>
              <div className="mb-3">
                <label htmlFor="product-category">
                  Category <span className="text-danger fw-bold">*</span>
                </label>
                <select value={form?.categoryId} onChange={(e) => handleInput("categoryId", e)} id="product-category" className="form-select" required="">
                  <option value="" hidden disabled>
                    Select Category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="product-desc">
                  Description <span className="text-danger fw-bold">*</span>
                </label>
                <input value={form?.description} onChange={(e) => handleInput("description", e)} type="text" className="form-control" id="product-desc" placeholder="Enter product description" autoComplete="off" required="" />
              </div>
              <div className="row">
                {/* <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="product-stock">
                      Stock <span className="text-danger fw-bold">*</span>
                    </label>
                    <input value={form?.stock} onChange={(e) => handleInput("stock", e)} type="number" min={0} className="form-control" id="product-stock" placeholder="Enter product stock" autoComplete="off" required="" />
                  </div>
                </div> */}
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="product-price">
                      Price <span className="text-danger fw-bold">*</span>
                    </label>
                    <input value={form?.price} onChange={(e) => handleInput("price", e)} type="number" min={0} className="form-control" id="product-price" placeholder="Enter product price" autoComplete="off" required="" />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="product-image">Image</label>
                <input value={form?.imgUrl} onChange={(e) => handleInput("imgUrl", e)} type="text" className="form-control" id="product-image" placeholder="Enter product image url" autoComplete="off" />
              </div>
              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <Link to={"/"} className="btn btn-lg btn-light rounded-pill w-100 p-2">
                    Cancel
                  </Link>
                </div>
                <div className="col-6">
                  <Button propName={propName} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End New Product Section */}
    </>
  );
}
