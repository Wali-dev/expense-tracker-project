
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

// eslint-disable-next-line react/prop-types, no-unused-vars
const AddExpenseForm = ({ addExpense, setAddEnpensehook }) => {
    const form = useForm({
        defaultValues: {
            amount: "",
            category: "",
            description: "",
            date: new Date(),
        },
    });

    const [selectedCategory, setSelectedCategory] = useState("Select Category");

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="px-3 py-2 border rounded-md w-full">
                                            {selectedCategory}
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {["Personal", "Foods", "Fees", "Subscription"].map((cate) => (
                                                <DropdownMenuItem
                                                    key={cate}
                                                    onSelect={() => {
                                                        setSelectedCategory(cate);
                                                        field.onChange(cate);
                                                    }}
                                                >
                                                    {cate}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter amount" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description <span className="text-sm">(Optional)</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className={cn(
                                                "w-full flex items-center justify-between px-3 py-2 border rounded-md",
                                                !field.value && "text-gray-400"
                                            )}>
                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                <CalendarIcon className="w-4 h-4 ml-2" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Submit</Button>
                    <Button
                        type="button"
                        className="w-full bg-white text-black hover:bg-white hover:text-black"

                        onClick={() => setAddEnpensehook(false)}
                    >
                        Cancel
                    </Button>
                </form>
            </Form>
        </div >
    );
};

export default AddExpenseForm;
