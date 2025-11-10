import React from "react";
import { BellIcon, MenuIcon, SearchIcon } from "lucide-react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Card, CardContent } from "../../components/Card";

export const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-[76px] border-b flex items-center justify-between px-8">
        <div className="flex items-center gap-4 flex-1 max-w-[522px]">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="search anything..."
              className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[10px] h-[38px] rounded-[5px]"
            />
          </div>
          <Button className="h-[38px] bg-[#001240] rounded-[0px_5px_5px_0px]">
            <MenuIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 p-8 overflow-auto">
        <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl mb-6">
          Dashboard
        </h1>
        <Card>
          <CardContent className="p-8">
            <p className="[font-family:'Poppins',Helvetica] text-[#000000] text-base">
              Welcome to the dashboard. This page is under construction.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
