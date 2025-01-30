import { useEffect, useState } from "react";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import AddExpenseForm from "./Components/AddExpenseForm";
import { useAuth } from '@/contexts/AuthContext';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
    const [addExpense, setAddEnpensehook] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const { setUser } = useAuth();

    const [userId, setUserId] = useState(null);
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const userData = response.data.data.data;
            setUser(userData);
            setUserId(userData.id);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchExpenses = async () => {
        if (!userId) return;
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/expense/?page=${page}&limit=${limit}&id=${userId}`
            );
            setExpenses(response.data.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchExpenses();
        }
    }, [userId, page]);

    const handleAddButton = () => {
        setAddEnpensehook(!addExpense);
    };

    const handleDelete = async (expenseId) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/expense/${expenseId}`);
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
            console.log("Expense deleted successfully");
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    return (
        addExpense ? (
            <AddExpenseForm addExpense={addExpense} setAddEnpensehook={setAddEnpensehook} />
        ) : (
            <div>
                <div className="Add flex justify-between items-center">
                    <div>
                        <div className="font-bold text-xl">Transactions</div>
                        <div className="text-sm">Your recent transactions will show up here</div>
                    </div>
                    <Button onClick={handleAddButton}>+ Add</Button>
                </div>

                <div className="mt-10 sm:min-h-72">
                    <div className="flex justify-between pb-2 border-b">
                        <div className="text-lg text-gray-500">Today</div>
                        <div className="text-gray-500">Total amount</div>
                    </div>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <div key={expense.id} className="flex justify-between border-b border-gray-300 py-5 font-mono">
                                <div className="flex sm:w-[500px] justify-between">
                                    <div>{expense.description || "No Description"}</div>
                                    <div>{expense.category || "Uncategorized"}</div>
                                    <div>{new Date(expense.createdAt).toLocaleString()}</div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div>-${expense.amount}</div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVertical size={16} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="hover: cursor-pointer">Edit</DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="hover: cursor-pointer"
                                                onClick={() => handleDelete(expense.id)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-4">No transactions found</div>
                    )}
                </div>

                <div className="mt-10">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                />
                            </PaginationItem>
                            {[...Array(3)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === index + 1}
                                        onClick={() => setPage(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => setPage((prev) => prev + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        )
    );
};

export default Home;
