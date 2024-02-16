"use client";
import { useState } from "react";

export const loginStatus = (request: string) => {
  const [loggedIn, setLoggedIn] = useState(true);
  if (request == "get status") {
    return loggedIn;
  } else if (request == "true") {
    setLoggedIn(true);
  } else if (request == "false") {
    setLoggedIn(false);
  }

  return loggedIn;
};
export default loginStatus;
export const utiliseCustomerID = (request: string, customerId: number) => {
  const [customerID, setCustomerId] = useState(0);

  if (request == "setId") {
    setCustomerId(customerId);
    return "Success";
  } else if (request == "getId") {
    return customerID;
  } else {
    return "Failed";
  }
};
0;
