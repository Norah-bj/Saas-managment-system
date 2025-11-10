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
    change: "+12 from last  month",
    icon: "/vector-4.svg",
  },
];

const navigationItems = [
  { label: "Dashboard", active: false },
  { label: "User management", active: false },
  { label: "CHW management", active: false },
  { label: "Emergency & Alerts", active: false },
  { label: "Ambulance tracker", active: true },
  { label: "Appointments", active: false },
  { label: "Data analytics", active: false },
  { label: "settings", active: false },
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
    plateNumber: "AMB-00835",
    driver: "Kabera John",
    currentLocation: "Kamatamu Hospital",
    vehicleType: "Kimironko / Biryogo",
    maintenanceDate: "25 - 09 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00835",
    driver: "Kabera John",
    currentLocation: "Kamatamu Hospital",
    vehicleType: "Kimironko / Biryogo",
    maintenanceDate: "25 - 09 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00835",
    driver: "Kabera John",
    currentLocation: "Kamatamu Hospital",
    vehicleType: "Kimironko / Biryogo",
    maintenanceDate: "25 - 09 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00835",
    driver: "Kabera John",
    currentLocation: "Kamatamu Hospital",
    vehicleType: "Kimironko / Biryogo",
    maintenanceDate: "25 - 09 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00835",
    driver: "Kabera John",
    currentLocation: "Kamatamu Hospital",
    vehicleType: "Kimironko / Biryogo",
    maintenanceDate: "25 - 09 -2025",
    status: "Online",
  },
];

const legendItems = [
  { label: "Available", color: "bg-[#09111e]" },
  { label: "En route", color: "bg-[#91b3ff]" },
  { label: "Maintenance", color: "bg-[#d1dfff]" },
  { label: "offline", color: "bg-[#d1dfff]" },
];

export const AmbulanceTracker = () => {
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

          <div className="grid grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <Card
                key={index}
                className="rounded-[5px] shadow-[1px_1px_6px_#10193466]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base [text-shadow:1px_-1px_4px_#00000040]">
                      {stat.title}
                    </div>
                    <img src={stat.icon} alt="" className="w-[22px] h-[35px]" />
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

          <div className="grid grid-cols-[1fr_400px] gap-6 mb-6">
            <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
              <CardContent className="p-6">
                <img
                  src="/group-1000005762.png"
                  alt="Rwanda Map"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>

            <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base text-center">
                    Ambulance availabiity
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

                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-[240px] h-[240px]">
                    <img
                      src="/ellipse-3.svg"
                      alt=""
                      className="absolute inset-0 w-full h-full"
                    />
                    <img
                      src="/ellipse-2.svg"
                      alt=""
                      className="absolute inset-0 w-full h-full"
                    />
                    <img
                      src="/ellipse-1.svg"
                      alt=""
                      className="absolute inset-0 w-full h-full"
                    />
                    <img
                      src="/ellipse.svg"
                      alt=""
                      className="absolute inset-0 w-full h-full"
                    />

                    <div className="absolute top-[20%] left-[15%] flex flex-col items-center gap-0.5">
                      <div className="[font-family:'Inter',Helvetica] font-bold text-[#323232] text-sm text-center">
                        60
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#767676] text-xs text-center">
                        60.0%
                      </div>
                    </div>

                    <div className="absolute top-[35%] left-[5%] flex flex-col items-center gap-0.5">
                      <div className="[font-family:'Inter',Helvetica] font-bold text-[#323232] text-sm text-center">
                        25
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#767676] text-xs text-center">
                        25.0%
                      </div>
                    </div>

                    <div className="absolute top-[25%] right-[25%] flex flex-col items-center gap-0.5">
                      <div className="[font-family:'Inter',Helvetica] font-bold text-[#323232] text-sm text-center">
                        10
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#767676] text-xs text-center">
                        10.0%
                      </div>
                    </div>

                    <div className="absolute top-[25%] right-[10%] flex flex-col items-center gap-0.5">
                      <div className="[font-family:'Inter',Helvetica] font-bold text-[#323232] text-sm text-center">
                        5
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#767676] text-xs text-center">
                        5.0%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-[3px] ${item.color}`} />
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[11px] text-center">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1 max-w-[400px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="search by name, phone number, or id"
                className="pl-10 h-[40px] rounded-[7px] border border-[#0000004c] [font-family:'Poppins',Helvetica] font-normal text-[#000000c7] text-xs"
              />
            </div>

            <Select>
              <SelectTrigger className="w-[150px] h-[40px] rounded-[7px] border border-[#0000004c]">
                <SelectValue
                  placeholder="status"
                  className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-[13px]"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[150px] h-[40px] rounded-[7px] border border-[#0000004c]">
                <SelectValue
                  placeholder="All locations"
                  className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-[13px]"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[150px] h-[40px] rounded-[3px] border border-[#0000004c]">
                <SelectValue
                  placeholder="vehicle type"
                  className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-[13px]"
                />
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

          <Card className="rounded-[5px]">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1.5">
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                          Amb Plate number
                        </span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                        Driver
                      </span>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1.5">
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                          Current Location
                        </span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                        Vehicle type
                      </span>
                    </TableHead>
                    <TableHead>
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                        maintenance date
                      </span>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1.5">
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                          Status
                        </span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1.5">
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                          Action
                        </span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index} className="border-b">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <span className="[font-family:'Work_Sans',Helvetica] font-medium text-[#000000] text-xs">
                          {row.plateNumber}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="[font-family:'Work_Sans',Helvetica] font-medium text-[#000000] text-xs">
                          {row.driver}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-xs">
                          {row.currentLocation}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-xs">
                          {row.vehicleType}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-xs whitespace-nowrap">
                          {row.maintenanceDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#05c16833] text-[#14c973] border-[0.6px] border-[#05c16880] hover:bg-[#05c16833]">
                          <div className="w-1 h-1 bg-[#05c168] rounded-full mr-1" />
                          <span className="font-paragraph-small font-[number:var(--paragraph-small-font-weight)] text-[length:var(--paragraph-small-font-size)] tracking-[var(--paragraph-small-letter-spacing)] leading-[var(--paragraph-small-line-height)] [font-style:var(--paragraph-small-font-style)]">
                            {row.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-auto w-auto p-1"
                          >
                            <PencilIcon className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-auto w-auto p-1"
                          >
                            <Trash2Icon className="w-[13px] h-[13px]" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-auto w-auto p-1"
                          >
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
