import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HolidaysTable() {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetch("/api/holidays/")
      .then((response) => response.json())
      .then((data) => setHolidays(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/holidays/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setHolidays(holidays.filter((h) => h._id !== id));
      });
  };

  return (
    <table border="1">
      <caption>Public Holidays</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Likes</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {holidays.map((holiday) => (
          <tr key={holiday._id}>
            <td>{holiday.name}</td>
            <td>{holiday.likes}</td>
            <td>
              <Link to="/">🎈</Link>
              <Link to={`/holidays/${holiday._id}`}>📝</Link>
              <button onClick={() => handleDelete(holiday._id)}>X</button>
            </td>
          </tr>
        ))}
        {/* <HolidayTableRow /> */}
      </tbody>
    </table>
  );
}

export default HolidaysTable;
