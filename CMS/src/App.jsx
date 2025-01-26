import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import BaseLayout from "./views/BaseLayout";
import HomePage from "./views/HomePage";
import CategoriesPage from "./views/CategoriesPage";
import AddUserPage from "./views/AddUserPage";
import AddCuisinePage from "./views/AddCuisinePage";
import EditCuisinePage from "./views/EditCuisinePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/add-cuisine" element={<AddCuisinePage />} />
            <Route path="/edit-cuisine/:id" element={<EditCuisinePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
