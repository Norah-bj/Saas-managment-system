import {
  BellIcon,
  DownloadIcon,
  MenuIcon,
  SearchIcon,
} from "lucide-react";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import { Input } from "../../components/Input";

const statsData = [
  {
    title: "Total Incidents",
    value: "1,287",
    change: "+5.2% this week",
  },
  {
    title: "Total Appointments",
    value: "1,287",
    change: "+2.3% this week",
  },
  {
    title: "Total Patients",
    value: "1,287",
    change: "+8.1% this week",
  },
  {
    title: "Engagement Rate",
    value: "85%",
    change: "+3.2% this month",
  },
];

const appointmentData = [
  { name: "Confirmed", value: 60, color: "#09111e" },
  { name: "Pending", value: 25, color: "#91b3ff" },
  { name: "Cancelled", value: 15, color: "#d1dfff" },
];

const healthcareLiveData = [
  { name: "Registered", value: 42, color: "#09111e" },
  { name: "Active", value: 35, color: "#5a7bb5" },
  { name: "Inactive", value: 23, color: "#d1dfff" },
];

const appointmentTrendData = [
  { month: "Jan", appointments: 45, patients: 38 },
  { month: "Feb", appointments: 52, patients: 42 },
  { month: "Mar", appointments: 48, patients: 40 },
  { month: "Apr", appointments: 61, patients: 50 },
  { month: "May", appointments: 55, patients: 48 },
  { month: "Jun", appointments: 67, patients: 55 },
  { month: "Jul", appointments: 70, patients: 58 },
  { month: "Aug", appointments: 65, patients: 53 },
];

const engagementData = [
  { month: "October", value: 35 },
  { month: "November", value: 42 },
  { month: "December", value: 38 },
  { month: "January", value: 55 },
  { month: "February", value: 48 },
  { month: "March", value: 62 },
  { month: "April", value: 70 },
  { month: "May", value: 45 },
];

export const ReportsAnalytics = () => {
  return (
    <div className="flex-1 flex flex-col">
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

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
            Reports & Analytics
          </h1>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                Export Report
              </span>
            </Button>
          </div>
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

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
                  Appointment Analytics
                </div>
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="h-auto px-3 py-1 bg-[#09111e] text-white rounded-sm"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-xs">
                    All time
                  </span>
                </Button> */}
              </div>

              <div className="flex items-center justify-between">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie
                      data={appointmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {appointmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="flex flex-col gap-3">
                  {appointmentData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-[3px]"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {item.name}
                      </span>
                      <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm ml-auto">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
                  Healthcare Live
                </div>
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="h-auto px-3 py-1 bg-[#09111e] text-white rounded-sm"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-xs">
                    All time
                  </span>
                </Button> */}
              </div>

              <div className="flex items-center justify-between">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie
                      data={healthcareLiveData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {healthcareLiveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="flex flex-col gap-3">
                  {healthcareLiveData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-[3px]"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                        {item.name}
                      </span>
                      <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm ml-auto">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040] mb-6">
          <CardContent className="p-6">
            <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-6">
              Appointment Overtime Trend
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#666", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis tick={{ fill: "#666", fontSize: 12 }} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#5a7bb5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Appointments"
                />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#f0d264"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Patients"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
          <CardContent className="p-6">
            <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-6">
              Engagement Level
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#666", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis tick={{ fill: "#666", fontSize: 12 }} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#09111e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
