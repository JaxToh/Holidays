import { useState } from "react";

function HolidayCreateForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleCreate = async () => {
    const info = { name };

    try {
      const response = await fetch("/api/holidays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setMsg("something went wrong");
    }
  };

  return (
    <>
      <fieldset>
        <legend>Create Holiday</legend>
        <label>
          Holiday Name:
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button onClick={handleCreate}>Create</button>
      </fieldset>
      <p>{msg}</p>
    </>
  );
}

export default HolidayCreateForm;
