import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

export function StudentForm() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const form = useForm();

  return (
    <div className="my-12 grid gap-6 px-2">
      <Form {...form}>
        <form>
          <fieldset className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="campus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Campus</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="campus-dropdown" className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                          <SelectItem value="option4">Option 4</SelectItem>
                          <SelectItem value="option5">Option 5</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="mess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Mess</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                          <SelectItem value="option4">Option 4</SelectItem>
                          <SelectItem value="option5">Option 5</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal mt-[2rem]",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            field.onChange(selectedDate);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Student</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name and Class</FormLabel>
                  <FormControl>
                    <Input placeholder="410401" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="mess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hygiene Environment in Dining Hall </FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="option1">Yes</SelectItem>
                          <SelectItem value="option2">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="mess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pest Control Done in Dining Hall</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="option1">Yes</SelectItem>
                          <SelectItem value="option2">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="mess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Handlers Following Protocols</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="option1">Yes</SelectItem>
                          <SelectItem value="option2">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodComplaints"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Food Related Complaints</FormLabel>
                  <FormControl>
                    <Input placeholder="Food complaints if any" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodSuggestions"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Suggestion for Improvements</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=" Any suggestion for improvements"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="mess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category of Complaints</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                          <SelectItem value="option4">Option 4</SelectItem>
                          <SelectItem value="option5">Option 5</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="mess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Time</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                          <SelectItem value="option4">Option 4</SelectItem>
                          <SelectItem value="option5">Option 5</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="col-span-2 mt-6 bg-[#6D52C1]">
              Submit
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
