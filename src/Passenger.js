export default function Passenger({ passenger }) {
  return (
    <div>
      <p>{passenger.name}</p>
      <p>{passenger.trips}</p>
      <p>{passenger.airline.flights}</p>
      <p>{passenger._id}</p>
    </div>
  );
}
