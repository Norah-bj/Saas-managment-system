import React, { useState } from "react";
import {
  BellIcon,
  DownloadIcon,
  EyeIcon,
  MenuIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  RotateCcwIcon,
} from "lucide-react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/Select";
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
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Pregnant mothers",
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Total children",
    value: "1,287",
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
    userId: "AME-100316",
    fullName: "Mukamana Alice",
    nationalId: "+250722222222",
    cell: "Gisozi",
    insurance: "RSSB",
    healthStatus: "SICK",
  },
  {
    userId: "AME-100317",
    fullName: "Niyonsenga Peter",
    nationalId: "+250711111111",
    cell: "Nyamirambo",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100318",
    fullName: "Uwase Diane",
    nationalId: "+250700000000",
    cell: "Kicukiro",
    insurance: "Private",
    healthStatus: "SICK",
  },
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredUsers = userData.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.healthStatus.toLowerCase() === statusFilter.toLowerCase();

    const matchesLocation =
      locationFilter === "all" ||
      user.cell.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-[76px] border-b flex items-center justify-between px-8">
        <div className="flex items-center gap-4 flex-1 max-w-[522px]">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="search anything..."
              className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]"
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

      {/* Main Section */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Top title section */}
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
                Export CSV
              </span>
            </Button>
            {/* <Button className="h-auto px-4 py-2 rounded-[3px] bg-[#09111e]">
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Add appointment
              </span>
            </Button> */}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-3 mb-4"> {/* Reduced gap-4 to gap-3, mb-6 to mb-4 */}
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="rounded-[5px] shadow-[1px_1px_6px_#10193466]"
            >
              <CardContent className="p-4"> {/* Reduced p-6 to p-4 */}
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm [text-shadow:1px_-1px_4px_#00000040] mb-3"> {/* Reduced text-base to text-sm, mb-4 to mb-3 */}
                  {stat.title}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl [text-shadow:1px_-1px_4px_#00000040] mb-1.5"> {/* Reduced text-2xl to text-xl, mb-2 to mb-1.5 */}
                  {stat.value}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[12px] [text-shadow:1px_-1px_4px_#00000040]"> {/* Reduced text-[13px] to text-[12px] */}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table Section */}
        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-[350px]">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="search by name, phone number, or id"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="sick">Sick</SelectItem>
                  </SelectContent>
                </Select>

                {/* Location Filter */}
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[150px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    <SelectItem value="Kabuye">Kabuye</SelectItem>
                    <SelectItem value="Gisozi">Gisozi</SelectItem>
                    <SelectItem value="Kicukiro">Kicukiro</SelectItem>
                    <SelectItem value="Nyamirambo">Nyamirambo</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export & Refresh */}
                <Button
                  variant="outline"
                  className="h-[38px] px-4 rounded-[3px] border border-[#0000004c]"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-xs">
                    Export
                  </span>
                </Button>

                <Button variant="ghost" size="icon" className="h-[38px] w-[38px]">
                  <RotateCcwIcon className="w-[15px] h-[15px]" />
                </Button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table className="text-sm"> {/* reduced default font size */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] px-2 py-1">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="px-2 py-1">Userid</TableHead>
                    <TableHead className="px-2 py-1">Full name</TableHead>
                    <TableHead className="px-2 py-1">National ID</TableHead>
                    <TableHead className="px-2 py-1">Cell</TableHead>
                    <TableHead className="px-2 py-1">Insurance</TableHead>
                    <TableHead className="px-2 py-1">Health status</TableHead>
                    <TableHead className="px-2 py-1">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.userId} className="text-sm"> {/* smaller font for rows */}
                      <TableCell className="px-2 py-1">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="px-2 py-1">{user.userId}</TableCell>
                      <TableCell className="px-2 py-1">{user.fullName}</TableCell>
                      <TableCell className="px-2 py-1">{user.nationalId}</TableCell>
                      <TableCell className="px-2 py-1">{user.cell}</TableCell>
                      <TableCell className="px-2 py-1">{user.insurance}</TableCell>
                      <TableCell className="px-2 py-1">
                        <Badge
                          variant="secondary"
                          className={`${
                            user.healthStatus === "SICK"
                              ? "bg-[#fde7e7] text-[#b00000]"
                              : "bg-[#d7f7e7] text-[#006633]"
                          } rounded-[3px] font-normal text-[10px] px-2 py-0.5`} 
                        >
                          {user.healthStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        <div className="flex items-center gap-1"> {/* slightly tighter buttons */}
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <PencilIcon className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <EyeIcon className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2Icon className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
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
