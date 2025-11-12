import React, { useState } from "react";
import {
  BellIcon,
  MenuIcon,
  SearchIcon,
  AlertTriangleIcon,
  UsersIcon,
  CheckCircleIcon,
  BarChart3Icon,
  Clock,
  TrendingUp,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Card, CardContent } from "../../components/Card";
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
    title: "Total mothers",
    value: "1,287",
    change: "+45 this week",
    icon: UsersIcon,
  },
  {
    title: "Active pregnancies",
    value: "1,287",
    change: "+45 this week",
    icon: TrendingUp,
  },
  {
    title: "Total children",
    value: "1,287",
    change: "+45 this week",
    icon: UsersIcon,
  },
  {
    title: "ANC Appointments",
    value: "89",
    change: "Next 7 days",
    icon: BarChart3Icon,
  },
];

const chartData = [
  { name: "Nyagatare", Emergencies: 18 },
  { name: "Huye", Emergencies: 14 },
  { name: "Ruhango", Emergencies: 12 },
  { name: "Muhanga", Emergencies: 10 },
];

const recentEmergencies = [
  {
    id: 1,
    name: "Mukamana Jane",
    location: "Gasabo",
    issue: "Headache",
    status: "Resolved",
  },
  {
    id: 2,
    name: "Mukamana Jane",
    location: "Gasabo",
    issue: "Headache",
    status: "Resolved",
  },
  {
    id: 3,
    name: "Mukamana Jane",
    location: "Gasabo",
    issue: "Headache",
    status: "Resolved",
  },
];

const recentActivity = [
  {
    id: 1,
    title: "New CHW Registration",
    description: "Jean Claude was registered in Nurse Department",
    timestamp: "5 min ago",
    icon: "user",
  },
  {
    id: 2,
    title: "ANC Appointment completed",
    description: "Today's antenatal appointments are completed",
    timestamp: "5 min ago",
    icon: "check",
  },
];

const emergencyAlerts = [
  {
    id: 1,
    name: "UWASE Claudine",
    idNum: "ID: UW8832",
    location: "Location: Nyabisindu",
    chw: "CHW: Kamono Jane",
    time: "5 min ago",
  },
  {
    id: 2,
    name: "UWASE Claudine",
    idNum: "ID: UW8832",
    location: "Location: Nyabisindu",
    chw: "CHW: Kamono Jane",
    time: "6 min ago",
  },
];

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("all-time");
  const [activityRange, setActivityRange] = useState("all-activity");
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-[76px] border-b flex items-center justify-between px-8 bg-white">
        <div className="flex items-center gap-4 flex-1 max-w-[522px]">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="search anything..."
              className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[10px] h-[38px] rounded-[3px]"
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
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-lg mb-1">
            Dashboard
          </h1>
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs">
            View all analytics and manage the system
          </p>
        </div>
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
        {/* <div className="grid grid-cols-4 gap-3 mb-4">
          <Card className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[10px] mb-1.5">
                    Total mothers
                  </div>
                  <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
                    1,287
                  </div>
                </div>
                <UsersIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[12px]">
                +4 this week
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[10px] mb-1.5">
                    Active pregnancies
                  </div>
                  <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
                    1,287
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[12px]">
                +4 this week
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[10px] mb-1.5">
                    Total children
                  </div>
                  <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
                    1,287
                  </div>
                </div>
                <UsersIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[12px]">
                +4 this week
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[10px] mb-1.5">
                    ANC Appointments
                  </div>
                  <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
                    89
                  </div>
                </div>
                <BarChart3Icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[12px]">
                Next 7 days
              </div>
            </CardContent>
          </Card>
        </div> */}
        <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                  Reports & Analytics
                </h3>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px] h-[32px] rounded-[3px] border border-[#0000004c] bg-[#09111e]">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All time</SelectItem>
                    <SelectItem value="last-week">Last week</SelectItem>
                    <SelectItem value="last-month">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4 flex gap-2">
                <button className="px-3 py-1.5 rounded-full [font-family:'Poppins',Helvetica] font-semibold text-white text-xs bg-[#09111e]">
                  Emergencies
                </button>
                <button className="px-3 py-1.5 rounded-full [font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xs border border-[#0000004c]">
                  ANC Trends
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#000000a6" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#000000a6" }} />
                  <Bar dataKey="Emergencies" fill="#0066FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                  Recent activity
                </h3>
                <Select
                  value={activityRange}
                  onValueChange={setActivityRange}
                >
                  <SelectTrigger className="w-[120px] h-[32px] rounded-[3px] border border-[#0000004c] bg-[#09111e]">
                    <SelectValue placeholder="All activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-activity">All activity</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="pb-4 border-b last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        {activity.icon === "user" ? (
                          <UsersIcon className="w-4 h-4 text-gray-600" />
                        ) : (
                          <CheckCircleIcon className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                          {activity.title}
                        </div>
                        <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs">
                          {activity.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                  Recent emergencies
                </h3>
                <Select defaultValue="today">
                  <SelectTrigger className="w-[100px] h-[32px] rounded-[3px] border border-[#0000004c] bg-[#09111e]">
                    <SelectValue placeholder="Today" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                    <SelectItem value="this-month">This month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xs">
                        Name
                      </TableHead>
                      <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xs">
                        Location
                      </TableHead>
                      <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xs">
                        Issue
                      </TableHead>
                      <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xs">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEmergencies.map((emergency) => (
                      <TableRow key={emergency.id}>
                        <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-xs">
                          {emergency.name}
                        </TableCell>
                        <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-xs">
                          {emergency.location}
                        </TableCell>
                        <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-xs">
                          {emergency.issue}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-xs bg-green-100 text-green-800">
                            {emergency.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                  Emergency alerts
                </h3>
                <Select defaultValue="all-alerts">
                  <SelectTrigger className="w-[120px] h-[32px] rounded-[3px] border border-[#0000004c] bg-[#09111e]">
                    <SelectValue placeholder="All alerts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-alerts">All alerts</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {emergencyAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border border-[#0000004c] rounded-[3px] hover:bg-gray-50 transition-colors bg-[#fff3cd]"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangleIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                          {alert.name}
                        </div>
                        <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mt-1">
                          {alert.idNum}
                        </div>
                        <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs">
                          {alert.location}
                        </div>
                        <div className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs">
                          {alert.chw}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};