import * as React from "react";
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
import Pasta from "../assets/pasta.jpg";

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
            <DialogTitle>Manager Resolvements</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="xs:max-h-[900px]">
              <fieldset className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="complaint_desc"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Manager Side Resolvements</FormLabel>
                      <FormControl>
                        <Input placeholder="actions taken" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <img
                  src={Pasta}
                  className="h-[10rem] w-[10rem] mt-2"
                  alt="Flowbite Logo"
                />
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
