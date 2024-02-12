interface order {
  customerID: number;
  fulfilled: 0;
  comment: string;
  amount: number;
  status: "Pending";
}

interface payment {
  orderID: number;
  paymentTypeID: number;
  amount: number;
}

export const createOrder = async (
  customerID: number,
  comment: string,
  amount: number
) => {
  const newOrder: order = {
    customerID: customerID,
    fulfilled: 0,
    comment: comment,
    amount: amount,
    status: "Pending",
  };
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/add_order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    }
  );
  return req.text();
};

export const addPayment = async (
  id: number,
  typeId: number,
  totalPrice: number
) => {
  const newPayment: payment = {
    orderID: id,
    paymentTypeID: typeId,
    amount: totalPrice,
  };
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayment),
    }
  );
  return req.text();
};
