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
    value: "1,287",
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
    value: "1,287",
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

// ✅ FIX: Add legend items for the map
const legendItems = [
  { color: "bg-red-500", label: "Critical" },
  { color: "bg-orange-500", label: "Urgent" },
  { color: "bg-yellow-400", label: "Moderate" },
  { color: "bg-green-500", label: "Available" },
  // { color: "bg-blue-500", label: "In Transit" },
];

export const EmergencyAlerts = () => {
  const [emergencies, setEmergencies] = useState([]);
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
          status: "Urgent",
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

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Top Stats */}
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

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-3 mb-4"> {/* Reduced gap-4 → gap-3, mb-6 → mb-4 */}
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="rounded-[5px] shadow-[1px_1px_6px_#10193466]"
              >
                <CardContent className="p-4"> {/* Reduced p-6 → p-4 */}
                  <div className="flex items-start justify-between mb-3"> {/* Reduced mb-4 → mb-3 */}
                    <div>
                      <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm [text-shadow:1px_-1px_4px_#00000040] mb-2"> {/* text-base → text-sm */}
                        {stat.title}
                      </div>
                      <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl [text-shadow:1px_-1px_4px_#00000040] mb-1.5"> {/* text-2xl → text-xl */}
                        {stat.value}
                      </div>
                      <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[12px] [text-shadow:1px_-1px_4px_#00000040]"> {/* text-[13px] → text-[12px] */}
                        {stat.change}
                      </div>
                    </div>
                    <IconComponent className="w-7 h-7 text-gray-400" /> {/* Slightly reduced from w-8 h-8 */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>


        {/* Alerts + Map */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Incoming Alerts */}
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
                        className={`rounded-[3px] font-normal text-xs px-2 py-1 ${getStatusBadgeColor(
                          alert.type
                        )}`}
                      >
                        {alert.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-[#000000a6]">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                      <span className="font-normal text-xs">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map Section */}
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-6">
              <img
                src="/group-1000005762.png"
                alt="Rwanda Map"
                className="w-full h-auto mb-4"
              />
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

        {/* Ambulance Table */}
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
                    className="pl-10 font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
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
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Caller name</TableHead>
                  <TableHead>Phone number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Maintenance date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
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
                      <TableCell>{emergency.alert_id}</TableCell>
                      <TableCell>{emergency.caller_name}</TableCell>
                      <TableCell>{emergency.phone_number}</TableCell>
                      <TableCell>{emergency.location}</TableCell>
                      <TableCell>{emergency.maintenance_date}</TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-[3px] text-xs px-3 py-1 ${getStatusBadgeColor(
                            emergency.status
                          )}`}
                        >
                          {emergency.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
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
              <span className="text-sm text-[#000000a6]">
                1—10 of {emergencies.length}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-auto px-3 py-2 rounded-[3px] border border-[#0000004c]"
                >
                  Previous
                </Button>
                <Button className="h-auto px-3 py-2 rounded-[3px] bg-[#09111e] text-white">
                  1
                </Button>
                <Button
                  variant="outline"
                  className="h-auto px-3 py-2 rounded-[3px] border border-[#0000004c]"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="h-auto px-3 py-2 rounded-[3px] border border-[#0000004c]"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
