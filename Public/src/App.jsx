import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./views/HomePage";
import DetailPage from "./views/DetailPage";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index path="/" element={<HomePage />} />
            <Route path="/:id" element={<DetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
