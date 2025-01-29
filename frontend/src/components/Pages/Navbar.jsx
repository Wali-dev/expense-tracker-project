import { Blocks, ChartLine, HouseWifi } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    return (
        <div className="flex justify-between items-center">
            <Blocks />
            <div className="flex justify-between sm:gap-6">
                <div className="flex items-center gap-1 hover:bg-slate-100 hover:cursor-pointer rounded p-2"><HouseWifi size={17} />Home</div>
                <div className="flex items-center gap-1 hover:bg-slate-100 hover:cursor-pointer rounded p-2"><ChartLine size={17} />Insights</div>

            </div>

            <DropdownMenu>
                <DropdownMenuTrigger><div className="w-9 h-9 rounded overflow-hidden hover:cursor-pointer">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="w-full h-full object-cover" />
                </div></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Toggle Mode</DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>


    );
};

export default Navbar;