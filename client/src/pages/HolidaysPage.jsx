import HolidayCreateForm from "../components/holidays/HolidayCreateForm";
import HolidaysTable from "../components/holidays/HolidaysTable";
import Navbar from "../components/Navbar";

function HolidaysPage() {
  return (
    <>
      <Navbar />
      <HolidayCreateForm />
      <HolidaysTable />
    </>
  );
}

export default HolidaysPage;
