import { useState } from "react";
import { useQuery } from "react-query";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
export default function PassengersAsync() {
  const [id, setID] = useState("5f1c59cbfa523c3aa793bff7");
  const formik = useFormik({
    initialValues: {
      _id: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setID(values._id);
    },
  });
  const fetchPassenger = async (id) => {
    const res = await fetch(
      `https://api.instantwebtools.net/v1/passenger/${id}`
    );
    return res.json();
  };
  const changeID = (event) => {
    event.preventDefault();
    setID(event.target.value);
  };
  const { data, error, isLoading } = useQuery(["passengerID", id], () =>
    fetchPassenger(id)
  );
  if (data) console.log(data);
  if (error) console.log(error);
  return (
    <>
      {/*   <input type="text" value={id} onChange={changeID} /> */}
      <form onSubmit={formik.handleSubmit}>
        <input id="_id" type="text" onChange={formik.handleChange}></input>
      </form>
      {data && (
        <p>
          {data.name}, {data.trips}
        </p>
      )}
      {isLoading && <p>Loading..</p>}
    </>
  );
}
