import { Link, useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function SideBar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    Toastify({
      text: "Sucessfully logged out",
      duration: 3000,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    navigate("/login");
  }

  return (
    <>
      {/* Sidebar */}
      <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" id="sidebar-menu">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" id="nav-product" className="nav-link cursor-pointer">
                <span className="icon material-symbols-outlined me-2">shopping_bag</span>
                Cuisines
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link" id="nav-category">
                <span className="icon material-symbols-outlined me-2">category</span>
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add-user"} className="nav-link" href="" id="nav-category">
                <span className="icon material-symbols-outlined me-2">account_circle</span>
                Add User
              </Link>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
            <span>Account</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link">
                {" "}
                <span className="icon material-symbols-outlined me-2">person</span>
                Hej, <span id="username">Hacktiv8!</span>
              </a>
            </li>
            <li onClick={handleLogout} className="nav-item">
              <Link to={"/login"} className="nav-link" id="nav-logout">
                <span className="icon material-symbols-outlined me-2">logout</span>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Sidebar */}
    </>
  );
}
