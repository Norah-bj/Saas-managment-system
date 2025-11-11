import {
  AlertTriangleIcon,
  BellIcon,
  DownloadIcon,
  EyeIcon,
  MenuIcon,
  PencilIcon,
  RotateCcwIcon,
  SearchIcon,
  Trash2Icon,
  TruckIcon,
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

const statsData = [
  {
    title: "Total Emergencies",
    value: "1, 287",
    change: "+45 this week",
    icon: AlertTriangleIcon,
  },
  {
    title: "Critical cases",
    value: "22%",
    change: "+8 this week",
    icon: AlertTriangleIcon,
  },
  {
    title: "Resolved cases",
    value: "1, 287",
    change: "+45 this week",
    icon: AlertTriangleIcon,
  },
  {
    title: "Busy ambulances",
    value: "89",
    change: "+12 from last month",
    icon: TruckIcon,
  },
];

const incomingAlerts = [
  {
    id: 1,
    title: "Maternal Hemorrhage",
    location: "Location: Inyabuthu",
    chw: "UWASE Cloudine",
    type: "Critical",
    time: "5 min ago",
  },
  {
    id: 2,
    title: "Severe Malaria",
    location: "Location: Inyabuthu",
    chw: "UWASE Cloudine",
    type: "Urgent",
    time: "8 min ago",
  },
  {
    id: 3,
    title: "Acute Respiratory",
    location: "Location: Inyabuthu",
    chw: "UWASE Cloudine",
    type: "Moderate",
    time: "10 min ago",
  },
];

export const EmergencyAlerts = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setEmergencies([
        {
          id: 1,
          alert_id: "AMB-00833",
          caller_name: "Kalisa John",
          phone_number: "+250788123456",
          location: "Kimironko / Biryogo",
          maintenance_date: "25 - 09 - 2025",
          status: "Available",
        },
        {
          id: 2,
          alert_id: "AMB-00835",
          caller_name: "Kalisa John",
          phone_number: "+250788123456",
          location: "Kimironko / Biryogo",
          maintenance_date: "25 - 09 - 2025",
          status: "Available",
        },
        {
          id: 3,
          alert_id: "AMB-00837",
          caller_name: "Kalisa John",
          phone_number: "+250788123456",
          location: "Kimironko / Biryogo",
          maintenance_date: "25 - 09 - 2025",
          status: "In Transit",
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "Urgent":
        return "bg-orange-100 text-orange-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Available":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Critical":
        return "#FF0000";
      case "Urgent":
        return "#FFA500";
      case "Moderate":
        return "#FFD700";
      default:
        return "#808080";
    }
  };

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
              Emergencies & Alerts
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
              Monitor and manage emergency incidents
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
              <AlertTriangleIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Assign cases
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="rounded-[5px] shadow-[1px_1px_6px_#10193466]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-2">
                        {stat.title}
                      </div>
                      <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-2xl mb-1">
                        {stat.value}
                      </div>
                      <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[13px]">
                        {stat.change}
                      </div>
                    </div>
                    <IconComponent className="w-8 h-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
                  Incoming and Active
                </h3>
                <Select defaultValue="all-alerts">
                  <SelectTrigger className="w-[120px] h-[32px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="All alerts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-alerts">All alerts</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {incomingAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border border-[#0000004c] rounded-[3px] hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm mb-1">
                          {alert.title}
                        </div>
                        <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-2">
                          {alert.location}
                        </div>
                        <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs">
                          CHW: {alert.chw}
                        </div>
                      </div>
                      <Badge
                        className={`rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-xs px-2 py-1 ${
                          alert.type === "Critical"
                            ? "bg-red-100 text-red-800"
                            : alert.type === "Urgent"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {alert.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-[#000000a6]">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-xs">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-6">
              <div className="h-[280px] bg-gray-100 rounded-[3px] flex items-center justify-center">
                <div className="text-center">
                  <img
                    src="/image copy.png"
                    alt="Emergency Map"
                    className="w-full h-full object-cover rounded-[3px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
                Ambulance Status
              </h3>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-[250px]">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="search by name, phone number, or id"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="h-[38px] px-4 rounded-[3px] border border-[#0000004c]"
                >
                  <RotateCcwIcon className="w-4 h-4" />
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
                    Alert ID
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Caller name
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Phone number
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Location
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                    Maintenance date
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
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : emergencies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No emergencies found
                    </TableCell>
                  </TableRow>
                ) : (
                  emergencies.map((emergency) => (
                    <TableRow key={emergency.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {emergency.alert_id}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {emergency.caller_name}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {emergency.phone_number}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {emergency.location}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {emergency.maintenance_date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-xs px-3 py-1 ${getStatusBadgeColor(
                            emergency.status
                          )}`}
                        >
                          {emergency.status}
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
                1—10 of {emergencies.length}
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
