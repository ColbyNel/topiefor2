"use server";

import { Interface } from "readline";


interface Category {
  categoryId: number;
  description: string;
}

interface MyFormData {
  email: string;
  password: string;
}
interface RegisterFormData {
  customerName: string;
  customerIDNo: string;
  phoneNumber: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  zip: string;
  email: string;
  password: string;
}


{
  /*GET CUSTOMER BY ID FROM DB*/
}


export const getSingleCustomer = async (customerId: string) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/get/${customerId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["customers" + customerId],
      },
    }
  );
  return await req.json();
};
{
  /*GET ALL CUSTOMERS FROM DB*/
}

export const getAllCustomers = async () => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 2,
      tags: ["customers", "searchCustomers"],
    },
  });
  return await req.json();
};

{
  /*GET ALL ITEMS IN A CATEGORY BY ID FROM DB*/
}

export const getProductsByCategory = async (id:number) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/get_product_catergory/${id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 2,
      tags: ["category", "productsbycategory"],
    },
  });
  // console.log(req)
  return await req.json();
}

export const getCategoryById = async (
  categoryId: number
): Promise<Category> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get_category/${categoryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!req.ok) {
    throw new Error(`Failed to fetch category. Status: ${req.status}`);
  }

  const data: Category = await req.json();
  return data;
};

export const getCategoryNameById = async (categoryID: number) => {
  const categoryObject = getCategoryById(categoryID)
  return (await categoryObject).description;
}

export const getProductById = async (productId: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_product/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["product" + productId],
      },
    }
  );
  return await req.json();
};

export const deleteCustomer = async (customerIDNo: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/delete/${customerIDNo}`,
    {
      method: "DELETE",
      next: {
        revalidate: 10,
        tags: ["delete" + customerIDNo],
      },
    }
  );
};

export const getAllCategories = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/all_categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["categories", "searchCategories"],
      },
    }
  );
  return await req.json();
};

export const getAllIngredients = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ingredients/all_ingredients`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["ingredients", "allIngredients"],
      },
    }
  )
  return await req.json();
}

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
  )
  return await req.json();
}

export const validateLogin = async (formData: MyFormData) => {
  const req:Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
  );

  const responseData = await req;
  return responseData.text();

 
}

export const signUp = async (formData: RegisterFormData ) => {
  const req:Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/signup`,
    {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
  );
  const responseData = await req;
  return responseData.text();
}

export const getAllOrders = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/all_orders`,
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
  )
  return await req.json();
}

export const getOrderById = async (orderId: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/get_order/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["orders", "orderbyid"],
      },
    }
  )
  return await req.json();
}


export const deleteProduct = async (productId: number) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/delete_product/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this)
    }
  )
  const responseData = await req;
  return responseData.text();
}

export const getProductsFromCart = async (cartId: number) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/get_shoppingcart/${cartId}`,
    {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
      }
    }
  )
  return req.json();
}

export const deleteProductFromCart = async (cartId:number,id:number) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/remove_product/${cartId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json", 
      },
      body: JSON.stringify(id),
    }
  )
  const responseData = await req;
  return responseData.text();
}

