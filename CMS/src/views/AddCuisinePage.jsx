import axios from "axios";
import Form from "../components/Form";
import { baseURL } from "../constans/baseUrl";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function AddCuisinePage() {
  const navigate = useNavigate();
  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: baseURL + "/apis/restaurant-app/cuisines",
        method: "POST",
        data: form,
        headers: {
          Authorization: `Berear ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: `Success add cuisine ${data.data.name} `,
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
  return (
    <>
      <Form handleSubmit={handleSubmit} propName="Add Cuisine" />
    </>
  );
}
