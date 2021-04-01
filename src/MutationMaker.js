import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

export default function MutationMaker() {
  const [name, setName] = useState("");
  const [trips, setTrips] = useState(0);
  const [airline, setAirline] = useState(0);
  const mutation = useMutation((item) =>
    axios.post("https://api.instantwebtools.net/v1/passenger/", item)
  );
  if (mutation.isSuccess) console.log(mutation.data);
  const sendData = () => {
    mutation.mutate({ name: "Hussain", trips: 420, airline: 5 });
    console.log(mutation);
  };
  return (
    <div>
      <button onClick={() => sendData()}>Click here to send data</button>
      {mutation.isLoading && <p>Loading..</p>}
      {mutation.isError && <p>Error</p>}
      {mutation.isSuccess && <p>Success! Check console</p>}
      {mutation.isIdle && <p>Idle..</p>}
    </div>
  );
}
