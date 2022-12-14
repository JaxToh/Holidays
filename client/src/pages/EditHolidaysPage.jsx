import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

// const log = debug("holidays:pages:EditHolidaysPage");

function EditHolidaysPage({ notLoggedIn }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [holiday, setHoliday] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);

    console.log("formInfo %o", info);
    if (info.celebrated === "on") {
      info.celebrated = true;
    } else {
      info.celebrated = false;
    }
    console.log("after %o", info);

    const response = await fetch(`/api/holidays/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    await response.json();
    navigate("/holidays");
  };

  useEffect(() => {
    if (notLoggedIn) {
      navigate("/");
    }
  }, [navigate, notLoggedIn]);

  useEffect(() => {
    const fetchHoliday = async () => {
      const response = await fetch(`/api/holidays/${id}`);
      const data = await response.json();
      setHoliday(data);
    };
    fetchHoliday();
  }, [id]);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Holiday</legend>
          <label>
            Name: <input name="name" defaultValue={holiday.name} />
          </label>
          <br />
          <label>
            Celebrated:
            <input
              type="checkbox"
              name="celebrated"
              defaultChecked={holiday.celebrated}
            ></input>
          </label>
          <br />
          <label>
            Likes:
            <input
              name="likes"
              type="number"
              min="0"
              defaultValue={holiday.likes}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              defaultValue={holiday.description}
            ></textarea>
          </label>
        </fieldset>
        <button>Update</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
}

export default EditHolidaysPage;
