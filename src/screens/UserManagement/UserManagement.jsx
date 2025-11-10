import {
  BellIcon,
  DownloadIcon,
  EyeIcon,
  MenuIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import React from "react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table";

const statsData = [
  {
    title: "Total registered mothers",
    value: "1, 287",
    change: "+45 this week",
  },
  {
    title: "Pregnant mothers",
    value: "1, 287",
    change: "+45 this week",
  },
  {
    title: "Total children",
    value: "1, 287",
    change: "+45 this week",
  },
  {
    title: "Sick users",
    value: "89",
    change: "+12 from last month",
  },
];

const userData = [
  {
    userId: "AME-100315",
    fullName: "Kabera John",
    nationalId: "+250733333333",
    cell: "Kabuye",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100315",
    fullName: "Kabera John",
    nationalId: "+250733333333",
    cell: "Kabuye",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100315",
    fullName: "Kabera John",
    nationalId: "+250733333333",
    cell: "Kabuye",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100316",
    fullName: "Kabera John",
    nationalId: "+250733333333",
    cell: "Kabuye",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100316",
    fullName: "Kabera John",
    nationalId: "+250733333333",
    cell: "Kabuye",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100315",
    fullName: "Kabera John",
    nationalId: "+250733333333",
    cell: "Kabuye",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
];

export const UserManagement = () => {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl mb-1">
              User management
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
              Manage mothers, pregnant women, children, and CHWs in the system
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                Export csv
              </span>
            </Button>
            <Button className="h-auto px-4 py-2 rounded-[3px] bg-[#09111e]">
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                add appointment
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="rounded-[5px] shadow-[1px_1px_6px_#10193466]"
            >
              <CardContent className="p-6">
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base [text-shadow:1px_-1px_4px_#00000040] mb-4">
                  {stat.title}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-2xl [text-shadow:1px_-1px_4px_#00000040] mb-2">
                  {stat.value}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px] [text-shadow:1px_-1px_4px_#00000040]">
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-[300px]">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="search by name, data, status, purpose etc..."
                  className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]"
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c] bg-[#09111e] text-white"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-xs">
                    All insurance
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c] bg-[#09111e] text-white"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-xs">
                    All cells
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c] bg-[#09111e] text-white"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-xs">
                    Health status
                  </span>
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Userid
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Full name
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    National ID
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Cell
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Insurance
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Health status
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                      {user.userId}
                    </TableCell>
                    <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                      {user.fullName}
                    </TableCell>
                    <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                      {user.nationalId}
                    </TableCell>
                    <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                      {user.cell}
                    </TableCell>
                    <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                      {user.insurance}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-[#d7f7e7] text-[#006633] rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-xs px-3 py-1"
                      >
                        {user.healthStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                  Previous
                </span>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-auto px-3 py-2 rounded-[3px] border border-[#0000004c] bg-[#09111e] text-white"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">
                    1
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto px-3 py-2 rounded-[3px] border border-[#0000004c]"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    2
                  </span>
                </Button>
              </div>

              <Button
                variant="outline"
                className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                  Next
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
