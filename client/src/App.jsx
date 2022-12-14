import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EditHolidaysPage from "./pages/EditHolidaysPage";
import HolidaysPage from "./pages/HolidaysPage";
import "./App.css";

localStorage.debug = "holidays:*";

function App() {
  const [notLoggedIn, setNotLoggedIn] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navbar setNotLoggedIn={setNotLoggedIn} />}
          />
          <Route path="/holidays" element={<HolidaysPage />} />
          <Route
            path="/holidays/:id"
            element={<EditHolidaysPage notLoggedIn={notLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
