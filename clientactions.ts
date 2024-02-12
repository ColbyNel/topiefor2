import { checkProductAvailability } from "./actions";

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

export const getProductsFromCart = async (cartId: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/get_shoppingcart/${cartId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["products", "getProductsFromCart"],
      },
    }
  );
  return await req.json();
};

export const deleteProductFromCart = async (cartId: number, id: number) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/remove_product/${cartId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );
  return req.text();
};

export const getAllProducts = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/all_products`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["products", "allProducts"],
      },
    }
  );
  return await req.json();
};

export const getProductById = async (productId: number) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_product/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["get_product"],
      },
    }
  );
  return await req.json();
};

export const addItemToCart = async (cartId: any, quantity: any, id: any) => {
  // const thisproduct = getProduct(id);
  // console.log(JSON.stringify({ id: id }));
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/add_product/${cartId}?quantity=${quantity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );

    const responseText = await req.text();
    // console.log(responseText);
    return responseText;
  } catch (error) {}
};

export const assessAvailability = async (productId: number) => {
  let returnValue: boolean = false;
  const status: string = await checkProductAvailability(productId);
  const firsThreeWords = status.split(" ").slice(0, 3).join(" ");
  const deleteStatus = await deleteProductFromCart(1, productId);
  if (firsThreeWords == "Product is out") {
    return returnValue;
  } else {
    returnValue = true;
    return returnValue;
  }
};