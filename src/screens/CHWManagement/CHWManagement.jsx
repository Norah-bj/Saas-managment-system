import {
  BellIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  MenuIcon,
  MessageSquareIcon,
  PencilIcon,
  PlusIcon,
  RotateCcwIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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
import { fetchCHWs } from "../../api/chwService";
import { CHWPieChart } from "../../components/CHWPieChart";

const statsData = [
  {
    title: "Total CHWs",
    value: "1, 287",
    change: "+45 this week",
  },
  {
    title: "Active CHWs",
    value: "1, 287",
    change: "+45 this week",
  },
  {
    title: "Inactive CHWs",
    value: "1, 287",
    change: "+45 this week",
  },
  {
    title: "Reports",
    value: "89",
    change: "+12 from last month",
  },
];

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (123) 456-7890",
    status: "Active",
    location: "New York",
  },
  
]

export const CHWManagement = () => {
  const [chwData, setChwData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  useEffect(() => {
    loadCHWs();
  }, []);

  const loadCHWs = async () => {
    try {
      const data = await fetchCHWs();
      setChwData(data);
    } catch (error) {
      console.error('Error fetching CHWs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = chwData.filter((chw) => {
    const matchesSearch =
      chw.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chw.phone_number.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || chw.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesLocation =
      locationFilter === "all" || chw.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

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
              CHW management
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
              View all analytics and manage the system
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
            >
              <MessageSquareIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                Message CHW
              </span>
            </Button>
            <Button className="h-auto px-4 py-2 rounded-[3px] bg-[#09111e]">
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Add CHW
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {statsData.slice(0, 3).map((stat, index) => (
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

          <Card className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
            <CardContent className="p-6">
              <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base [text-shadow:1px_-1px_4px_#00000040] mb-4">
                CHW Status Distribution
              </div>
              <div className="h-[250px]">
                <CHWPieChart
                  data={[
                    { name: "Active CHWs", value: chwData.filter((c) => c.status === "Active").length, color: "#0066FF" },
                    { name: "Inactive CHWs", value: chwData.filter((c) => c.status === "Inactive").length, color: "#001F4D" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
          <CardContent className="p-6">
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue
                      placeholder="Status"
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-[13px]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[150px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue
                      placeholder="All locations"
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-[13px]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                  </SelectContent>
                </Select>

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

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Full name
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Gender
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Phone number
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Location
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Start date
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Status
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                        Loading...
                      </span>
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                        No CHWs found
                      </span>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((chw, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {chw.full_name}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {chw.gender}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {chw.phone_number}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {chw.location}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {chw.start_date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-xs px-3 py-1 ${
                            chw.status === "Active"
                              ? "bg-[#d7f7e7] text-[#006633]"
                              : "bg-[#f5f5f5] text-[#666666]"
                          }`}
                        >
                          {chw.status}
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
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-6">
              <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                1—10 of {filteredData.length}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-auto px-3 py-2 rounded-[3px] border border-[#0000004c]"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    Previous
                  </span>
                </Button>
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
                <Button
                  variant="outline"
                  className="h-auto px-3 py-2 rounded-[3px] border border-[#0000004c]"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    Next
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
