"use server";

import { Interface } from "readline";

interface Category {
  categoryId: number;
  description: string;
}

{
  /*GET CUSTOMER BY ID FROM DB*/
}

export const getSingleCustomer = async (id: string) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/get/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["customers" + id],
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

export const getAllItemsFromCategory = async (categoryId) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/all_items_by_category/${categoryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["customers", "searchCustomers"],
      },
    }
  );

  return await req.json();
};

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

export const getItemById = async (itemId: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/get_item/${itemId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["items" + itemId],
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
