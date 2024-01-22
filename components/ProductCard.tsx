import { getItemById } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";



const ProductCard = async (itemid: any) => {
    const selectItem = await getItemById(itemid);
  return (
    <div className="flex min-h-screen">
    <Card>
      <CardHeader>
        <CardTitle>{selectItem.itemTitle}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
    </div>
  );
};
export default ProductCard;
