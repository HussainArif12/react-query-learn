import { useState } from "react";
import { useQuery } from "react-query";
import Passenger from "./Passenger";
export default function Passengers() {
  const [page, setPage] = useState(0);

  const getData = (page) => {
    return fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=3`
    );
  };
  const { isLoading, error, data, isFetching, isSuccess } = useQuery(
    ["repoData", page],
    () => getData(page).then((res) => res.json()),
    { keepPreviousData: true }
  );

  /*  if (isFetching) return "Fetching.."; */
  if (error) return "An error has occurred: " + error.message;
  if (data) console.log(data);
  return (
    <div>
      <p>Check console</p>
      <label name="+" />
      <button onClick={() => setPage((old) => old + 1)}>+</button>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        {" "}
        -{" "}
      </button>
      <p>At page number: {page}</p>
      {isFetching && <p>Fetching</p>}
      {isLoading && <p>Loading</p>}
      {isSuccess &&
        data.data.map((item) => (
          <div key={item._id}>
            <Passenger passenger={item} />
            <br />
          </div>
        ))}
    </div>
  );
}
