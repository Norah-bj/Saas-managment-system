import {
  AlertTriangleIcon,
  BellIcon,
  DownloadIcon,
  EyeIcon,
  MenuIcon,
  PencilIcon,
  Power,
  RotateCcwIcon,
  SearchIcon,
  Trash2Icon,
  TruckIcon,
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
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    alert_id: "",
    caller_name: "",
    phone_number: "",
    location: "",
    maintenance_date: "",
    status: "",
  });
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
          caller_name: "Mukamana Elise",
          phone_number: "+250781234567",
          location: "Remera / Kabeza",
          maintenance_date: "21 - 09 - 2025",
          status: "Urgent",
        },
        {
          id: 3,
          alert_id: "AMB-00837",
          caller_name: "Uwitonze Marie",
          phone_number: "+250789123456",
          location: "Gikondo / Merez",
          maintenance_date: "19 - 09 - 2025",
          status: "Critical",
        },
        {
          id: 4,
          alert_id: "AMB-00838",
          caller_name: "Nshimiyimana Joel",
          phone_number: "+250780123456",
          location: "Huye / Ngoma",
          maintenance_date: "18 - 09 - 2025",
          status: "Available",
        },
        {
          id: 5,
          alert_id: "AMB-00839",
          caller_name: "Ingabire Solange",
          phone_number: "+250782345678",
          location: "Musanze / Muhoza",
          maintenance_date: "17 - 09 - 2025",
          status: "Moderate",
        },
        {
          id: 6,
          alert_id: "AMB-00840",
          caller_name: "Habineza Alexis",
          phone_number: "+250783456789",
          location: "Nyagatare / Matimba",
          maintenance_date: "16 - 09 - 2025",
          status: "In Transit",
        },
        {
          id: 7,
          alert_id: "AMB-00841",
          caller_name: "Dusabe Clarisse",
          phone_number: "+250784567890",
          location: "Ruhango / Mbuye",
          maintenance_date: "15 - 09 - 2025",
          status: "Urgent",
        },
        {
          id: 8,
          alert_id: "AMB-00842",
          caller_name: "Kagabo Patrick",
          phone_number: "+250785678901",
          location: "Kirehe / Mahama",
          maintenance_date: "14 - 09 - 2025",
          status: "Critical",
        },
        {
          id: 9,
          alert_id: "AMB-00843",
          caller_name: "Mukakarisa Anne",
          phone_number: "+250786789012",
          location: "Rusizi / Kamembe",
          maintenance_date: "13 - 09 - 2025",
          status: "Available",
        },
        {
          id: 10,
          alert_id: "AMB-00844",
          caller_name: "Uwase Denise",
          phone_number: "+250787890123",
          location: "Rubavu / Gisenyi",
          maintenance_date: "12 - 09 - 2025",
          status: "Moderate",
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

  const handleViewDetails = (emergency) => {
    setSelectedEmergency(emergency);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmergency(null);
  };

  const handleEditEmergency = (emergency) => {
    setSelectedEmergency(emergency);
    setEditFormData({
      alert_id: emergency.alert_id || "",
      caller_name: emergency.caller_name || "",
      phone_number: emergency.phone_number || "",
      location: emergency.location || "",
      maintenance_date: emergency.maintenance_date || "",
      status: emergency.status || "",
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEmergency(null);
    setEditFormData({
      alert_id: "",
      caller_name: "",
      phone_number: "",
      location: "",
      maintenance_date: "",
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
    // TODO: Implement API call to update emergency
    console.log("Updating emergency:", editFormData);
    handleCloseEditModal();
  };

  const handleDeleteEmergency = (emergency) => {
    setSelectedEmergency(emergency);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmergency(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedEmergency) {
      // TODO: Implement API call to delete emergency
      console.log("Deleting emergency:", selectedEmergency);
      handleCloseDeleteModal();
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredEmergencies = emergencies.filter((emergency) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      emergency.alert_id.toLowerCase().includes(normalizedSearch) ||
      emergency.caller_name.toLowerCase().includes(normalizedSearch) ||
      emergency.phone_number.toLowerCase().includes(normalizedSearch) ||
      emergency.location.toLowerCase().includes(normalizedSearch);
    const matchesStatus =
      statusFilter === "all" || emergency.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredEmergencies.length / pageSize));
  const paginatedEmergencies = filteredEmergencies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startIndex = filteredEmergencies.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredEmergencies.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            {/* <Button className="h-auto px-4 py-2 rounded-[3px] bg-[#09111e]">
              <AlertTriangleIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Assign cases
              </span>
            </Button> */}
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

            <Table className="text-[13px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-[12px]">
                    {/* <Checkbox /> */}
                  </TableHead>
                  <TableHead className="text-[12px]">Alert ID</TableHead>
                  <TableHead className="text-[12px]">Caller name</TableHead>
                  <TableHead className="text-[12px]">Phone number</TableHead>
                  <TableHead className="text-[12px]">Location</TableHead>
                  <TableHead className="text-[12px]">Maintenance date</TableHead>
                  <TableHead className="text-[12px]">Status</TableHead>
                  <TableHead className="text-[12px]">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-[13px]">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredEmergencies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-[13px]">
                      No emergencies found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmergencies.map((emergency) => (
                    <TableRow key={emergency.id} className="text-[13px]">
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
                          className={`rounded-[3px] text-[12px] px-3 py-[2px] ${getStatusBadgeColor(
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
                            onClick={() => handleEditEmergency(emergency)}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleDeleteEmergency(emergency)}
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleViewDetails(emergency)}
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

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-[#000000a6]">
                {filteredEmergencies.length === 0
                  ? "0 results"
                  : `${startIndex}-${endIndex} of ${filteredEmergencies.length}`}
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
      {isModalOpen && selectedEmergency && (
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
                  {selectedEmergency.caller_name?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-lg">
                  {selectedEmergency.caller_name || "N/A"}
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                  {selectedEmergency.alert_id || "N/A"}
                </p>
              </div>
            </div>
            <div>
              <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                Emergency Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Alert ID
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedEmergency.alert_id || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Caller Name
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedEmergency.caller_name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Phone Number
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedEmergency.phone_number || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Location
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedEmergency.location || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Maintenance Date
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedEmergency.maintenance_date || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Status
                  </p>
                  <Badge className={`rounded-[3px] text-[12px] px-3 py-[2px] ${getStatusBadgeColor(selectedEmergency.status)}`}>
                    {selectedEmergency.status || "N/A"}
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
                Edit Emergency
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                Update emergency information
              </p>
            </div>
            <form onSubmit={handleSubmitEdit} className="space-y-6">
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Emergency Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Alert ID<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter alert ID"
                      value={editFormData.alert_id}
                      onChange={(e) => handleInputChange("alert_id", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Caller Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter caller name"
                      value={editFormData.caller_name}
                      onChange={(e) => handleInputChange("caller_name", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="+250XXXXXXXXX"
                      value={editFormData.phone_number}
                      onChange={(e) => handleInputChange("phone_number", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Location<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter location"
                      value={editFormData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
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
                      value={editFormData.maintenance_date}
                      onChange={(e) => handleInputChange("maintenance_date", e.target.value)}
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
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="In Transit">In Transit</SelectItem>
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
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">Update Emergency</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedEmergency && (
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
                Delete Emergency
              </h2>
            </div>
            <div className="mb-6">
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm leading-relaxed">
                Are you sure you want to delete this emergency record? This action cannot be undone.
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
