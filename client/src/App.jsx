import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EditHolidaysPage from "./pages/EditHolidaysPage";
import HolidaysPage from "./pages/HolidaysPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/holidays" element={<HolidaysPage />} />
          <Route path="/holidays/:id" element={<EditHolidaysPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
