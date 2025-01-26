import { useEffect, useState } from "react";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { baseURL } from "../constans/baseUrl";
import Toastify from "toastify-js";

export default function EditCuisinePage() {
  const [cuisine, setCuisine] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchcuisine() {
    try {
      const { data } = await axios({
        url: baseURL + `/apis/restaurant-app/cuisines/${id}`,
        method: "GET",
        headers: {
          Authorization: `Berear ${localStorage.access_token}`,
        },
      });
      // console.log(data);

      setCuisine(data.data);
    } catch (error) {
      console.log(error);

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

  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "PUT",
        url: baseURL + `/apis/restaurant-app/cuisines/${id}`,
        data: form,
        headers: {
          Authorization: `Berear ${localStorage.access_token}`,
        },
      });

      console.log(data);

      Toastify({
        text: data?.message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      navigate("/");
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
    fetchcuisine();
  }, []);

  return (
    <>
      <Form handleSubmit={handleSubmit} cuisine={cuisine} propName="Edit Cuisine" />
    </>
  );
}
