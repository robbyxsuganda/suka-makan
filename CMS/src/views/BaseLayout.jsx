import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Toastify from "toastify-js";
import { useNavigate, Outlet } from "react-router";
import SideBar from "../components/SideBar";

export default function BaseLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.access_token) {
      Toastify({
        text: "Please login first",
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
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {/* Home Section */}
      <section className="container-fluid" id="home-section">
        <div className="row">
          <Navbar />
          <SideBar />
          <Outlet />
        </div>
      </section>
      {/* End Home Section */}
    </>
  );
}
