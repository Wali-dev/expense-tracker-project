import { useState, useEffect } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,

    ChartTooltipContent,
} from "@/components/ui/chart";

const Report = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = "fba2b4b4-c969-4d15-a06f-93a0b3aaf3da";

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/expense/?page=1&limit=5&id=${userId}`
                );
                if (response.data.success) {
                    setExpenses(response.data.data);
                } else {
                    setError("Failed to fetch expenses");
                }
            } catch (err) {
                setError("An error occurred while fetching expenses");
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Format the expenses data for the chart
    const chartData = expenses.map((expense) => ({
        category: expense.category,
        amount: expense.amount,
    }));

    const chartConfig = {
        amount: {
            label: "Amount",
            color: "hsl(var(--chart-1))",
        },
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Expenses Report</CardTitle>
                    <CardDescription>Expenses for the past month</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis />
                            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                            <Bar dataKey="amount" fill="var(--color-desktop)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Showing expenses for the last month
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Report;
