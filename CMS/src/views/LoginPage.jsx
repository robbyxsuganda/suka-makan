import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";
import { baseURL } from "../constans/baseUrl";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.access_token) {
      Toastify({
        text: "You already logged in",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: baseURL + "/apis/login",
        method: "POST",
        data: {
          email,
          password,
        },
      });

      const access_token = data.data.access_token;

      localStorage.setItem("access_token", access_token);

      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
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
          color: "#000000",
        },
      }).showToast();
    }
  };

  return (
    <>
      {/* Login Section */}
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>Log in and autocomplete your order with your personal data, or sign up to enjoy all the benefits of an Suka Makan.</span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img
                  src="https://asset-3.tstatic.net/jualbeli/img/njajal/2017/11/Anda-Termasuk-Tipe-Orang-yang-Suka-Makan-dengan-Cepat--Hati-hati-Ini-Dia-Ancaman-Kesehatan-Dibalik-Kebiasaan-Tersebut-master-540482489.jpg"
                  width="350px"
                  height="380px"
                  alt="sofa"
                />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form onSubmit={handleLogin} id="login-form">
                    <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                    <span>Log in on your profile to autocomplete your purchase order with your personal data.</span>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="login-email" placeholder="Enter email address ..." autoComplete="off" required="" />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="login-password" placeholder="Enter your password ..." autoComplete="off" required="" />
                    </div>
                    <div className="checkbox mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue="" id="login-remember" />
                        <label className="form-check-label" htmlFor="login-remember">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <button className="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit">
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Login Section */}
    </>
  );
}
