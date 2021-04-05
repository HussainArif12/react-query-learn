import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useFormik } from "formik";
export default function MutationMaker() {
  const [name, setName] = useState("");
  const [trips, setTrips] = useState(0);
  const [airline, setAirline] = useState(0);
  const formik = useFormik({
    initialValues: {
      name: "",
      trips: 0,
      airline: 1,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setName(values.name);
      setTrips(values.trips);
      setAirline(values.airline);
      sendData();
    },
  });
  const mutation = useMutation((item) =>
    axios.post("https://api.instantwebtools.net/v1/passenger/", item)
  );
  if (mutation.isSuccess) console.log(mutation.data.data);
  const sendData = () => {
    mutation.mutate({ name: name, trips: trips, airline: airline });
    console.log(mutation);
  };
  return (
    <div>
      <h1>Submit form</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name
          <input id="name" type="text" onChange={formik.handleChange} />
        </label>
        <label>
          Trips
          <input id="trips" type="number" onChange={formik.handleChange} />
        </label>
        <label>
          Airline:
          <input id="airline" type="number" onChange={formik.handleChange} />
        </label>
        <button type="submit">Sumbit</button>
      </form>
      {mutation.isLoading && <p>Please wait</p>}
      {mutation.isSuccess && <p>Success! ID: {mutation.data.data._id}</p>}
    </div>
  );
}
