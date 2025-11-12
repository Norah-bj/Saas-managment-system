import {
  BellIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  MenuIcon,
  PencilIcon,
  PlusIcon,
  RotateCcwIcon,
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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const statsData = [
  {
    title: "Total ambulances",
    value: "1, 287",
    change: "+45 this week",
    icon: "/vector-4.svg",
  },
  {
    title: "Ambulances en route",
    value: "1, 287",
    change: "+45 this week",
    icon: "/vector-4.svg",
  },
  {
    title: "Available ambulances",
    value: "1, 287",
    change: "+45 this week",
    icon: "/vector-4.svg",
  },
  {
    title: "Busy ambulances",
    value: "89",
    change: "+12 from last month",
    icon: "/vector-4.svg",
  },
];

const tableData = [
  {
    plateNumber: "AMB-00835",
    driver: "Kabera John",
    currentLocation: "Kamatamu Hospital",
    vehicleType: "Kimironko / Biryogo",
    maintenanceDate: "25 - 09 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00836",
    driver: "Niyonsenga Peter",
    currentLocation: "Kigali CHUK",
    vehicleType: "Kimironko / Biryogo",
    maintenanceDate: "01 - 10 -2025",
    status: "Online",
  },
];

const chartData = [
  { name: "Available", value: 60 },
  { name: "Maintenance", value: 25 },
  { name: "En route", value: 10 },
  { name: "Offline", value: 5 },
];

const COLORS = ["#001240", "#a4b0ff", "#4d8dff", "#d1dfff"];

export const AmbulanceTracker = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
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

      {/* Body */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Title + Buttons */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
            Ambulance tracker
          </h1>

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
            <Button className="h-auto px-4 py-2 bg-[#001240] rounded-sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Assign cases
              </span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-4"> {/* gap-4 → gap-3, mb-6 → mb-4 */}
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="rounded-[5px] shadow-[1px_1px_6px_#10193466]"
            >
              <CardContent className="p-4"> {/* p-6 → p-4 */}
                <div className="flex items-start justify-between mb-3"> {/* mb-4 → mb-3 */}
                  <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm [text-shadow:1px_-1px_4px_#00000040]"> {/* text-base → text-sm */}
                    {stat.title}
                  </div>
                  <img src={stat.icon} alt="" className="w-[20px] h-[30px]" /> {/* w-[22px]→20px, h-[35px]→30px */}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl [text-shadow:1px_-1px_4px_#00000040] mb-1.5"> {/* text-2xl → text-xl, mb-2 → mb-1.5 */}
                  {stat.value}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[12px] [text-shadow:1px_-1px_4px_#00000040]"> {/* text-[13px] → text-[12px] */}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* Map + Pie Chart */}
        <div className="grid grid-cols-[1fr_400px] gap-6 mb-6">
          {/* Map Card */}
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-6">
              <img
                src="/group-1000005762.png"
                alt="Rwanda Map"
                className="w-full h-auto"
              />
            </CardContent>
          </Card>

          {/* Pie Chart Card */}
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
                  Ambulance availability
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto px-3 py-1 bg-[#09111e] text-white rounded-sm"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-xs">
                    All time
                  </span>
                </Button>
              </div>

              <div className="w-full h-[250px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="horizontal"
                      align="center"
                      verticalAlign="bottom"
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Filters */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-[400px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="search by name, phone number, or id"
              className="pl-10 h-[40px] rounded-[7px] border border-[#0000004c]"
            />
          </div>

          <Select>
            <SelectTrigger className="w-[150px] h-[40px] rounded-[7px] border border-[#0000004c]">
              <SelectValue placeholder="status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] h-[40px] rounded-[7px] border border-[#0000004c]">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] h-[40px] rounded-[3px] border border-[#0000004c]">
              <SelectValue placeholder="vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="h-[40px] w-[40px]">
            <FilterIcon className="w-6 h-6" />
          </Button>

          <Button variant="ghost" size="icon" className="h-[40px] w-[40px]">
            <RotateCcwIcon className="w-[15px] h-[15px]" />
          </Button>
        </div>

        {/* Data Table */}
        <Card className="rounded-[5px]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Amb Plate number</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>Vehicle type</TableHead>
                  <TableHead>Maintenance date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{row.plateNumber}</TableCell>
                    <TableCell>{row.driver}</TableCell>
                    <TableCell>{row.currentLocation}</TableCell>
                    <TableCell>{row.vehicleType}</TableCell>
                    <TableCell>{row.maintenanceDate}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#05c16833] text-[#14c973] border-[0.6px] border-[#05c16880]">
                        <div className="w-1 h-1 bg-[#05c168] rounded-full mr-1" />
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="p-1">
                          <PencilIcon className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="p-1">
                          <Trash2Icon className="w-[13px] h-[13px]" />
                        </Button>
                        <Button variant="ghost" size="icon" className="p-1">
                          <EyeIcon className="w-[13px] h-[9px]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
