import { Link } from "react-router-dom";

function HolidayTableRow() {
  return (
    <tr>
      <td>One</td>
      <td>99</td>
      <td>
        <Link to="/">🎈</Link>
        <Link to="/">📝</Link>
      </td>
    </tr>
  );
}

export default HolidayTableRow;
