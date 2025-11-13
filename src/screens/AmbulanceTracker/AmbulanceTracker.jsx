import {
  BellIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  MenuIcon,
  PencilIcon,
  PlusIcon,
  Power,
  RotateCcwIcon,
  SearchIcon,
  Trash2Icon,
  X,
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
import { Pagination } from "../../components/Pagination";
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
    title: "Offline ambulances",
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
  {
    plateNumber: "AMB-00837",
    driver: "Uwase Claire",
    currentLocation: "Nyabihu District Hospital",
    vehicleType: "Gasabo / Kacyiru",
    maintenanceDate: "12 - 10 -2025",
    status: "Maintenance",
  },
  {
    plateNumber: "AMB-00838",
    driver: "Mukiza Samuel",
    currentLocation: "Huye Teaching Hospital",
    vehicleType: "Huye / Ngoma",
    maintenanceDate: "03 - 11 -2025",
    status: "Offline",
  },
  {
    plateNumber: "AMB-00839",
    driver: "Ingabire Alice",
    currentLocation: "Ruhango Health Center",
    vehicleType: "Ruhango / Byimana",
    maintenanceDate: "18 - 09 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00840",
    driver: "Nkurunziza Eric",
    currentLocation: "Muhanga Referral",
    vehicleType: "Muhanga / Nyamabuye",
    maintenanceDate: "27 - 10 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00841",
    driver: "Mukamana Aline",
    currentLocation: "Musanze District Hospital",
    vehicleType: "Musanze / Cyuve",
    maintenanceDate: "14 - 08 -2025",
    status: "Maintenance",
  },
  {
    plateNumber: "AMB-00842",
    driver: "Habimana David",
    currentLocation: "Kicukiro Health Post",
    vehicleType: "Kicukiro / Kagarama",
    maintenanceDate: "06 - 09 -2025",
    status: "Online",
  },
  {
    plateNumber: "AMB-00843",
    driver: "Nyirabarera Solange",
    currentLocation: "Rusizi Provincial Hospital",
    vehicleType: "Rusizi / Kamembe",
    maintenanceDate: "21 - 11 -2025",
    status: "Offline",
  },
  {
    plateNumber: "AMB-00844",
    driver: "Kambanda Bosco",
    currentLocation: "Gicumbi District",
    vehicleType: "Gicumbi / Byumba",
    maintenanceDate: "09 - 10 -2025",
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
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    plateNumber: "",
    driver: "",
    currentLocation: "",
    vehicleType: "",
    maintenanceDate: "",
    status: "",
  });
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(tableData.length / pageSize));
  const paginatedTableData = tableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startIndex = tableData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, tableData.length);

  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAmbulance(null);
  };

  const handleEditAmbulance = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setEditFormData({
      plateNumber: ambulance.plateNumber || "",
      driver: ambulance.driver || "",
      currentLocation: ambulance.currentLocation || "",
      vehicleType: ambulance.vehicleType || "",
      maintenanceDate: ambulance.maintenanceDate || "",
      status: ambulance.status || "",
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAmbulance(null);
    setEditFormData({
      plateNumber: "",
      driver: "",
      currentLocation: "",
      vehicleType: "",
      maintenanceDate: "",
      status: "",
    });
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to update ambulance
    console.log("Updating ambulance:", editFormData);
    handleCloseEditModal();
  };

  const handleDeleteAmbulance = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAmbulance(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedAmbulance) {
      // TODO: Implement API call to delete ambulance
      console.log("Deleting ambulance:", selectedAmbulance);
      handleCloseDeleteModal();
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
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 p-4 overflow-auto">
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
            {/* <Button className="h-auto px-4 py-2 bg-[#001240] rounded-sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Assign cases
              </span>
            </Button> */}
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

              <div className="w-full h-[250px] mb-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      nameKey="name"
                      // label={({ name, percent }) =>
                      //   `${name}: ${(percent * 100).toFixed(0)}%`
                      // }
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
                      verticalAlign="bottom"
                      align="center"
                      iconType="square"
                      content={() => (
                        <div className="mt-4 flex gap-4 justify-items-start">
                          {[
                            { label: "Available", color: "#09111e" },
                            { label: "En route", color: "#91b3ff" },
                            { label: "Maintenance", color: "#d1dfff" },
                            { label: "Offline", color: "#cccccc" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-[3px]"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="[font-family:'Poppins',Helvetica] text-[11px] text-[#000]">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
          <CardContent className="p-5">

            {/* Table Filters (now inside card) */}
            <div className="mb-5 flex flex-wrap items-center justify-between">
              <div className="relative flex-1 max-w-[400px]">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, phone number, or ID"
                  className="pl-10 h-[38px] rounded-[6px] border border-[#00000040] text-[13px]"
                />
              </div>

              <div className="flex item-center gap-3">
                <Select>
                  <SelectTrigger className="w-[140px] h-[38px] rounded-[6px] border border-[#00000040] text-[13px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[140px] h-[38px] rounded-[6px] border border-[#00000040] text-[13px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[140px] h-[38px] rounded-[6px] border border-[#00000040] text-[13px]">
                    <SelectValue placeholder="Vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon" className="h-[38px] w-[38px]">
                  <FilterIcon className="w-5 h-5" />
                </Button>

                <Button variant="ghost" size="icon" className="h-[38px] w-[38px]">
                  <RotateCcwIcon className="w-[14px] h-[14px]" />
                </Button>
              </div>

            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table className="text-[13px]">
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="w-[50px] text-[12px]"></TableHead>
                    <TableHead className="text-[12px]">Amb Plate number</TableHead>
                    <TableHead className="text-[12px]">Driver</TableHead>
                    <TableHead className="text-[12px]">Current Location</TableHead>
                    <TableHead className="text-[12px]">Vehicle type</TableHead>
                    <TableHead className="text-[12px]">Maintenance date</TableHead>
                    <TableHead className="text-[12px]">Status</TableHead>
                    <TableHead className="text-[12px]">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedTableData.map((row, index) => (
                    <TableRow key={index} className="border-b text-[13px]">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{row.plateNumber}</TableCell>
                      <TableCell>{row.driver}</TableCell>
                      <TableCell>{row.currentLocation}</TableCell>
                      <TableCell>{row.vehicleType}</TableCell>
                      <TableCell>{row.maintenanceDate}</TableCell>
                      <TableCell>
                        <Badge className="flex items-center gap-1 bg-[#05c16833] text-[#14c973] border-[0.6px] border-[#05c16880] text-[12px] px-2 py-[2px] rounded-[3px]">
                          <div className="w-1.5 h-1.5 bg-[#05c168] rounded-full" />
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="p-[3px]"
                            onClick={() => handleEditAmbulance(row)}
                          >
                            <PencilIcon className="w-[16px] h-[16px]" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="p-[3px]"
                            onClick={() => handleDeleteAmbulance(row)}
                          >
                            <Trash2Icon className="w-[16px] h-[16px]" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="p-[3px]"
                            onClick={() => handleViewDetails(row)}
                          >
                            <EyeIcon className="w-[16px] h-[16px]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 px-1">
              <span className="text-[12px] text-[#000000a6]">
                {tableData.length === 0
                  ? "0 results"
                  : `${startIndex}-${endIndex} of ${tableData.length}`}
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Details Modal */}
      {isModalOpen && selectedAmbulance && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8"
          onClick={handleCloseModal}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div 
            className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-[600px] p-6 z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-xl font-semibold text-gray-600">
                  {selectedAmbulance.plateNumber?.charAt(0) || "?"}
                </span>
              </div>
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-lg">
                  {selectedAmbulance.plateNumber || "N/A"}
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                  {selectedAmbulance.driver || "N/A"}
                </p>
              </div>
            </div>
            <div>
              <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                Ambulance Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Plate Number
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAmbulance.plateNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Driver
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAmbulance.driver || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Current Location
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAmbulance.currentLocation || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Vehicle Type
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAmbulance.vehicleType || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Maintenance Date
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAmbulance.maintenanceDate || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Status
                  </p>
                  <Badge className="flex items-center gap-1 bg-[#05c16833] text-[#14c973] border-[0.6px] border-[#05c16880] text-[12px] px-2 py-[2px] rounded-[3px]">
                    <div className="w-1.5 h-1.5 bg-[#05c168] rounded-full" />
                    {selectedAmbulance.status || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8"
          onClick={handleCloseEditModal}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div 
            className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-[800px] p-6 z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseEditModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl mb-1">
                Edit Ambulance
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                Update ambulance information
              </p>
            </div>
            <form onSubmit={handleSubmitEdit} className="space-y-6">
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Ambulance Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Plate Number<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter plate number"
                      value={editFormData.plateNumber}
                      onChange={(e) => handleInputChange("plateNumber", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Driver<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter driver name"
                      value={editFormData.driver}
                      onChange={(e) => handleInputChange("driver", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Current Location<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter current location"
                      value={editFormData.currentLocation}
                      onChange={(e) => handleInputChange("currentLocation", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Vehicle Type<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter vehicle type"
                      value={editFormData.vehicleType}
                      onChange={(e) => handleInputChange("vehicleType", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Maintenance Date
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter maintenance date"
                      value={editFormData.maintenanceDate}
                      onChange={(e) => handleInputChange("maintenanceDate", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Status<span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={editFormData.status} 
                      onValueChange={(value) => handleInputChange("status", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue placeholder="select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseEditModal}
                  className="h-auto px-6 py-2 rounded-[3px] border border-[#0000004c] bg-white text-[#001240] hover:bg-gray-50"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">Cancel</span>
                </Button>
                <Button
                  type="submit"
                  className="h-auto px-6 py-2 rounded-[3px] bg-[#001240] text-white hover:bg-[#001240]/90"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">Update Ambulance</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedAmbulance && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8"
          onClick={handleCloseDeleteModal}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div 
            className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-[500px] p-6 z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseDeleteModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Power className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
                Delete Ambulance
              </h2>
            </div>
            <div className="mb-6">
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm leading-relaxed">
                Are you sure you want to delete this ambulance record? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                onClick={handleConfirmDelete}
                className="h-auto px-6 py-2 rounded-[3px] bg-[#001240] text-white hover:bg-[#001240]/90"
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">Confirm</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDeleteModal}
                className="h-auto px-6 py-2 rounded-[3px] border border-[#0000004c] bg-white text-[#000000] hover:bg-gray-50"
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">Cancel</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
