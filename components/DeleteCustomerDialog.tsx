import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteCustomerDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700">Delete</DialogTrigger>
      <DialogContent className="border rounded-lg p-10 flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-4xl font-bold text-red-600 pb-5">Are you sure?</DialogTitle>
          <DialogDescription className="text-center flex justify-center font-bold text-lg">
            This action cannot be undone. <br />This will permanently delete the customer and remove their data from the server
          </DialogDescription>
          <button type="submit" className="flex justify-center   rounded bg-secondary mb-5 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900">
              Proceed
            </button>
            <button className="flex rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800">
              Back
            </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteCustomerDialog;
