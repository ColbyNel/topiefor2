"use server"

{/*GET CUSTOMER BY ID FROM DB*/}

export const getSinlgeCustomer = async (id: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/get/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
        next: {
            revalidate: 60,
            tags: ["customers" + id]
        }
    });
    return await req.json();
};

{/*GET ALL CUSTOMERS FROM DB*/}

export const getAllCustomers = async () =>{
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/all`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
        next: {
            revalidate: 60,
            tags: ["customers","searchCustomers"]
        },
    })

    return await req.json();
};

{/*GET ALL ITEMS IN THE SWEET CATEGORY FROM DB*/}

export const getAllSweetItems = async () => {
const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/all_items_by_category/1`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json",
    },
    next: {
        revalidate: 60,
        tags: ["customers","searchCustomers"]
    },
})

    return await req.json();
};

export const getItemById = async (itemid: any) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/get_item/${itemid}`,{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
        },
        next: {
            revalidate: 60,
            tags:["items/get_item" + itemid],
        }
    });

    return await req.json();
}