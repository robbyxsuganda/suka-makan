import { useState } from "react";
import Button from "../components/Button";
import Toastify from "toastify-js";
import axios from "axios";
import { baseURL } from "../constans/baseUrl";
import { useNavigate } from "react-router";

export default function AddUserPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  function handleInput(fieldName, e) {
    setUser((oldValue) => {
      return {
        ...oldValue,
        [fieldName]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const { data } = await axios({
        url: baseURL + "/apis/add-user",
        data: user,
        method: "POST",
        headers: {
          Authorization: `Berear ${localStorage.access_token}`,
        },
      });

      console.log(data);

      Toastify({
        text: `${data.message}`,
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
      {/* New User Section */}
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-user-section">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <form onSubmit={handleSubmit} id="register-form">
                <h1 className="h3 mb-3 display-1">Register User</h1>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-username">Username</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input onChange={(e) => handleInput("username", e)} type="text" className="form-control" id="register-username" placeholder="Enter username ..." autoComplete="off" required="" />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-email">Email</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input onChange={(e) => handleInput("email", e)} type="email" className="form-control" id="register-email" placeholder="Enter email address ..." autoComplete="off" required="" />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-password">Password</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input onChange={(e) => handleInput("password", e)} type="password" className="form-control" id="register-password" placeholder="Enter password ..." autoComplete="off" required="" />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-phone">Phone Number</label>
                  <input onChange={(e) => handleInput("phoneNumber", e)} type="text" className="form-control" id="register-phone" placeholder="Enter phone number (optional) ..." autoComplete="off" />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-address">Address</label>
                  <textarea onChange={(e) => handleInput("address", e)} id="register-address" className="form-control" rows={3} placeholder="Enter address (optional) ..." autoComplete="off" defaultValue={""} />
                </div>
                <Button propName={"Add User"} />
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* End New User Section */}
    </>
  );
}
