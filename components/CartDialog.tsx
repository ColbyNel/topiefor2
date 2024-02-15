import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";

interface PopupProps {
    link: boolean;
  }

const CartDialog: React.FC<PopupProps> = ({ link }) => {
  return (
    <Dialog>
        {link ? (
      <DialogTrigger className="button-hover group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-white transition-colors hover:bg-secondary focus:outline-none focus:ring active:bg-secondary">
        Add to Cart
      </DialogTrigger>
      ):(
        <DialogTrigger className="relative flex text-sm focus:outline-none">
        <a className="button-hover">
          <img className=" h-8 w-8 " src="/shoppingcart.png" alt="Cart" />
        </a>
      </DialogTrigger>
      )
      }
      <DialogContent className="flex flex-row justify-center p-16 border rounded-lg">
        <DialogHeader className="flex flex-col justify-center" >
          <DialogTitle className="flex justify-center text-4xl font-bold text-primary mb-6">Uh oh!</DialogTitle>
          <div className="flex justify-center mb-6">
            <img src="sad-face.png" alt="Sad Face" className="h-36 w-36" />
          </div>
          <DialogDescription className="mb-6 text-lg text-center font-bold">
            It looks like you're not logged in yet. 
            <br />
            You're one step away!
          </DialogDescription>
          <div className="flex flex-row justify-center gap-5 mt-4">
          <LoginDialog button={true} />
            <SignUpDialog button={false} />
            </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog
