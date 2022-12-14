import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState({});

  const handleLogin = (info) => async () => {
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    console.log(response);

    if (response.ok) {
      fetch("/api/secret")
        .then((request) => request.json())
        .then((data) => setMsg(data));
      navigate("/holidays/6398311e1dea6cd01b130951");
    }
  };

  useEffect(() => {
    fetch("/api/secret")
      .then((request) => request.json())
      .then((data) => setMsg(data));
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/holidays">Holidays</Link>
        </li>
        <li>
          <button onClick={handleLogin({ password: "123" })}>Login</button>
          <button onClick={handleLogin({ password: "" })}>Fail Login</button>
        </li>
      </ul>
      <p>{msg.msg}</p>
    </nav>
  );
}

export default Navbar;
