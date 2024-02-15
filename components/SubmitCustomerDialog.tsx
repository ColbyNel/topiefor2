import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SubmitCustomerDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="inline-block rounded bg-secondary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900">
        Submit
      </DialogTrigger>
      <DialogContent className="p-10 border rounded-lg flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-5xl font-bold p-3">Are you sure?</DialogTitle>
          <DialogDescription className="flex flex-col justify-center p-5 mt-5">
            <button className="flex rounded bg-secondary mb-5 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900">
              Submit
            </button>
            <button className="flex rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800">
              Back
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitCustomerDialog;
