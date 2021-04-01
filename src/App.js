import { QueryClient, QueryClientProvider } from "react-query";
import Passengers from "./Passengers";
import { useState } from "react";
import MutationMaker from "./MutationMaker";
import PassengersAsync from "./PassengerAsync";
const queryClient = new QueryClient();
export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Passengers />
        <MutationMaker />
        <PassengersAsync />
      </QueryClientProvider>
    </div>
  );
}
