
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";
import AddExpenseForm from "./Components/AddExpenseForm";


const Home = () => {

    const [addExpense, setAddEnpensehook] = useState(false);


    const handleAddButton = () => {
        setAddEnpensehook(!addExpense)
    }
    return (

        (addExpense ? <AddExpenseForm addExpense={addExpense} setAddEnpensehook={setAddEnpensehook} /> : <div className="">
            <div className="Add flex justify-between items-center">
                <div>
                    <div className="font-bold text-xl">Transactions</div>
                    <div className="text-sm">Your all recent transactions will show up here</div>
                </div>
                <div>
                    <Button onClick={handleAddButton}>+ Add</Button>
                </div>
            </div>

            {/* today */}
            <div className="mt-10">
                <div className="flex justify-between pb-2 border-b">
                    <div className="text-lg text-gray-500">Today</div>
                    <div className="text-gray-500">Total amount</div>
                </div>
                <div className="flex justify-between border-b border-gray-300 py-5 ">
                    <div className="flex sm:w-96 justify-between">
                        <div>Name</div>
                        <div>Category</div>
                        <div>Date and Time</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div>Amount</div>
                        <EllipsisVertical size={16} />
                    </div>
                </div>


            </div>


            {/* pagination */}

            <div className="mt-10">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>)

    );
};

export default Home;