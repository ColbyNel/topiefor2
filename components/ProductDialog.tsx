
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductProps {
  productID: number;
}


const getProductById = async (productId: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_product/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["product"],
      },
    }
  );
  return await req.json();
};

  const handleClick = () => {
    console.log("Button Clicked")
  }

  

  const addItemToCart = async (cartId: any, quantity: any, id: any) => {
    console.log(JSON.stringify(id));
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/add_product/${cartId}?quantity=${quantity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }
    );
    const response = req;

    return response.text();
  };
  // setInterval(getProductById,2000)

  

const ProductDialog: React.FC<ProductProps> = ( {productID}) => {

  const getProductById = async (productId: any) => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/get_product/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["product"],
        },
      }
    );
    return await req.json();
  };
  
    const handleClick = () => {
      console.log("Button Clicked")
    }
  
    
  
    const addItemToCart = async (cartId: any, quantity: any, id: any) => {
      console.log(JSON.stringify(id));
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/add_product/${cartId}?quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        }
      );
      const response = req;
  
      return response.text();
    };


  const ID = productID
  // const product = await getProductById(ID);
  return (
    <Dialog>
      <DialogTrigger className="aspect-square w-100 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 hover:text-white"></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This product</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ProductDialog;
