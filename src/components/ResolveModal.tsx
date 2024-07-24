import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

export default function Component() {
  const form = useForm();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Resolve</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] xs:max-h-[900px]">
        <div className="w-full grid gap-6 bg-white p-10 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Resolve Complaint</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="xs:max-h-[900px]">
              <fieldset className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="complaint_desc"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Necessary Actions Takens</FormLabel>
                      <FormControl>
                        <Input placeholder="actions taken" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-row-[auto_1fr] items-center gap-4">
                  <Label htmlFor="file-input">Upload File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-input"
                      type="file"
                      className="flex-1 w-[230px]"
                    />
                    <Button variant="outline">Choose File</Button>
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-[#6D52C1]">
            Confirm Resolve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
