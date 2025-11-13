import {
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EyeIcon,
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

const statsData = [
  {
    title: "Total appointments",
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Upcoming (Next 7days)",
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Completed appointments",
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Missed appointments",
    value: "89",
    change: "+12 from last month",
  },
];

const appointmentTypes = [
  { name: "Antenatal", color: "#0066FF" },
  { name: "Postnatal", color: "#FF1493" },
  { name: "Vaccination", color: "#0066FF" },
  { name: "Follow-up", color: "#FFA500" },
];

const APPOINTMENT_FORM_DEFAULT = {
  patient_name: "",
  phone_number: "",
  appointment_date: "",
  appointment_time: "",
  type: "",
  chw_name: "",
  status: "Scheduled",
};

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 12)); // Updated to November 2025 context
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(APPOINTMENT_FORM_DEFAULT);
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setAppointments([
        {
          id: 1,
          patient_name: "Jane Doe",
          phone_number: "+250788111111",
          appointment_date: "2025-11-09",
          appointment_time: "10:00",
          type: "Vaccination",
          chw_name: "UWASE Cloudine",
          status: "Scheduled",
        },
        {
          id: 2,
          patient_name: "Mary Smith",
          phone_number: "+250788222222",
          appointment_date: "2025-11-14",
          appointment_time: "14:30",
          type: "Antenatal",
          chw_name: "John Kalisa",
          status: "Scheduled",
        },
        {
          id: 3,
          patient_name: "Sarah Wilson",
          phone_number: "+250788333333",
          appointment_date: "2025-11-20",
          appointment_time: "09:00",
          type: "Postnatal",
          chw_name: "UWASE Cloudine",
          status: "Completed",
        },
        {
          id: 4,
          patient_name: "Alice Johnson",
          phone_number: "+250788444444",
          appointment_date: "2025-11-21",
          appointment_time: "11:00",
          type: "Follow-up",
          chw_name: "John Kalisa",
          status: "Missed",
        },
        {
          id: 5,
          patient_name: "Elizabeth Brown",
          phone_number: "+250788555555",
          appointment_date: "2025-11-25",
          appointment_time: "15:00",
          type: "Vaccination",
          chw_name: "UWASE Cloudine",
          status: "Scheduled",
        },
      ]);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getAppointmentsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.filter((apt) => apt.appointment_date === dateStr);
  };

  const getTypeColor = (type) => {
    const typeObj = appointmentTypes.find((t) => t.name === type);
    return typeObj ? typeObj.color : "#ccc";
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Missed":
        return "bg-red-100 text-red-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setEditFormData({
      patient_name: appointment.patient_name || "",
      phone_number: appointment.phone_number || "",
      appointment_date: appointment.appointment_date || "",
      appointment_time: appointment.appointment_time || "",
      type: appointment.type || "",
      chw_name: appointment.chw_name || "",
      status: appointment.status || "Scheduled",
    });
    setIsEditModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditFormData(APPOINTMENT_FORM_DEFAULT);
    setSelectedAppointment(null);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditFormData(APPOINTMENT_FORM_DEFAULT);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
    setEditFormData(APPOINTMENT_FORM_DEFAULT);
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    const updatedAppointment = {
      ...selectedAppointment,
      ...editFormData,
    };

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === selectedAppointment.id ? updatedAppointment : appointment
      )
    );
    setSelectedAppointment(updatedAppointment);
    handleCloseEditModal();
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      ...editFormData,
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setCurrentPage(1);
    handleCloseCreateModal();
  };

  const handleDeleteAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedAppointment) {
      // TODO: Implement API call to delete appointment
      console.log("Deleting appointment:", selectedAppointment);
      handleCloseDeleteModal();
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      appointment.patient_name.toLowerCase().includes(normalizedSearch) ||
      appointment.phone_number.toLowerCase().includes(normalizedSearch) ||
      appointment.type.toLowerCase().includes(normalizedSearch);
    const matchesType = filterType === "all" || appointment.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / pageSize));
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startIndex = filteredAppointments.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredAppointments.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="h-[76px] border-b flex items-center justify-between px-8">
        <div className="flex items-center gap-3 flex-1 max-w-[522px]"> {/* Reduced gap from 4 to 3 */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="search anything..."
              className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]" /* Reduced h-[38px] to h-[34px] */
            />
          </div>
          <Button className="h-[38px] bg-[#001240] rounded-[0px_5px_5px_0px]">
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3"> {/* Reduced gap from 4 to 3 */}
          <Button variant="ghost" size="icon">
            <BellIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-auto"> {/* Reduced padding from p-8 to p-6 */}
        <div className="flex items-center justify-between mb-4"> {/* Reduced mb-6 to mb-4 */}
          <div>
            <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-lg mb-1"> {/* Reduced text-xl to text-lg */}
              Appointments
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs"> {/* Reduced text-sm to text-xs */}
              View all appointments
            </p>
          </div>

          <div className="flex items-center gap-2"> {/* Reduced gap from 3 to 2 */}
            <Button
              variant="outline"
              className="h-auto px-3 py-1.5 rounded-[3px] border border-[#0000004c]" /* Reduced py-2 to py-1.5, px-4 to px-3 */
            >
              <DownloadIcon className="w-4 h-4 mr-1.5" /> {/* Reduced mr-2 to mr-1.5 */}
              <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-xs"> {/* Reduced text-sm to text-xs */}
                Export csv
              </span>
            </Button>
            <Button className="h-auto px-3 py-1.5 rounded-[3px] bg-[#09111e]" onClick={handleOpenCreateModal}>
              <PlusIcon className="w-4 h-4 mr-1.5" /> 
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-xs">
                Add appointment
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

        <div className="grid grid-cols-3 gap-4 mb-4"> {/* Reduced gap-6 to gap-4, mb-6 to mb-4 */}
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040] col-span-2">
            <CardContent className="p-4"> {/* Reduced p-6 to p-4 */}
              <div className="mb-4"> {/* Reduced mb-6 to mb-4 */}
                <div className="flex items-center justify-between mb-3"> {/* Reduced mb-4 to mb-3 */}
                  <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm"> {/* Reduced text-base to text-sm */}
                    Calendar View
                  </h3>
                  <div className="flex items-center gap-1.5"> {/* Reduced gap-2 to gap-1.5 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={previousMonth}
                      className="h-7 w-7"
                    >
                      <ChevronLeftIcon className="w-3.5 h-3.5" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5 */}
                    </Button>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xs min-w-[90px] text-center"> {/* Reduced text-sm to text-xs, min-w-[100px] to [90px] */}
                      {monthName}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextMonth}
                      className="h-7 w-7" 
                    >
                      <ChevronRightIcon className="w-3.5 h-3.5" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5 */}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4"> {/* Reduced gap-4 to gap-3, mb-6 to mb-4 */}
                  {appointmentTypes.map((type) => (
                    <div key={type.name} className="flex items-center gap-1.5"> {/* Reduced gap-2 to gap-1.5 */}
                      <div
                        className="w-2.5 h-2.5 rounded" 
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[11px]"> {/* Reduced text-xs to text-[11px] */}
                        {type.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5 mb-1.5"> {/* Reduced gap-2 to gap-1.5, mb-2 to mb-1.5 */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px] py-1.5" 
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1.5"> {/* Reduced gap-2 to gap-1.5 */}
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-[3px] border border-[#0000004c] min-h-[70px] ${ /* Reduced p-3 to p-2, min-h-[80px] to [70px] */
                        day ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {day && (
                        <>
                          <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px] mb-1.5"> {/* Reduced text-sm to text-[11px], mb-2 to mb-1.5 */}
                            {day}
                          </div>
                          <div className="space-y-1">
                            {getAppointmentsForDay(day).map((apt, idx) => (
                              <div key={idx} className="relative group">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: getTypeColor(apt.type) }}
                                ></div>
                                <div className="absolute left-4 top-1/2 hidden w-48 -translate-y-1/2 group-hover:flex z-20">
                                  <div className="bg-[#09111e] text-white rounded-md px-3 py-2 shadow-lg">
                                    <div className="[font-family:'Poppins',Helvetica] font-semibold text-sm mb-1 flex items-center justify-between">
                                      <span>{apt.type}</span>
                                      <span className="text-xs text-white/70">{apt.appointment_time}</span>
                                    </div>
                                    <div className="[font-family:'Poppins',Helvetica] text-xs text-white/80">
                                      <div className="mb-1">CHW: {apt.chw_name}</div>
                                      <div className="capitalize">Status: {(apt.status || "Scheduled").toLowerCase()}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-4"> {/* Reduced p-6 to p-4 */}
              <div className="mb-3"> {/* Reduced mb-4 to mb-3 */}
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm mb-3"> {/* Reduced text-base to text-sm, mb-4 to mb-3 */}
                  Filters
                </h3>

                <div className="space-y-3"> {/* Reduced space-y-4 to space-y-3 */}
                  <div>
                    <label className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px] block mb-1.5"> {/* Reduced text-sm to text-[11px], mb-2 to mb-1.5 */}
                      Appointment Type
                    </label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full rounded-[3px] border border-[#0000004c]">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type.name} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-[3px] border border-[#0000004c]"
                  >
                    <RotateCcwIcon className="w-3.5 h-3.5 mr-1.5" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5, mr-2 to mr-1.5 */}
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
          <CardContent className="p-4"> {/* Reduced p-6 to p-4 */}
            <div className="flex items-center justify-between mb-4"> {/* Reduced mb-6 to mb-4 */}
              <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm"> {/* Reduced text-base to text-sm */}
                Appointments List
              </h3>

              <div className="flex items-center gap-2"> {/* Reduced gap-3 to gap-2 */}
                <div className="relative flex-1 max-w-[200px]"> {/* Reduced max-w-[250px] to [200px] */}
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5 */}
                  <Input
                    placeholder="search by name, phone, or type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]" 
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[120px] h-[36px] rounded-[3px] border border-[#0000004c]"> {/* Reduced w-[150px] to [120px], h-[38px] to [36px] */}
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.name} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="h-[36px] px-3 rounded-[3px] border border-[#0000004c]" 
                >
                  <RotateCcwIcon className="w-3.5 h-3.5" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5 */}
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    {/* <Checkbox /> */}
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    Patient Name
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    Phone Number
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    Appointment Date
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    Time
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    Type
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    CHW Name
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    Status
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6"> {/* Reduced py-8 to py-6 */}
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6"> {/* Reduced py-8 to py-6 */}
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                        {appointment.patient_name}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                        {appointment.phone_number}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                        {appointment.appointment_date}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                        {appointment.appointment_time}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-[10px] px-1.5 py-0.5" 
                          style={{
                            backgroundColor: getTypeColor(appointment.type),
                            color: "white",
                          }}
                        >
                          {appointment.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                        {appointment.chw_name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-[10px] px-2 py-0.5 ${getStatusBadgeColor( /* Reduced text-xs to text-[10px], px-3 to px-2, py-1 to py-0.5 */
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1"> {/* Reduced gap-2 to gap-1 */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleEditAppointment(appointment)}
                          >
                            <PencilIcon className="w-3.5 h-3.5" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5 */}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleDeleteAppointment(appointment)}
                          >
                            <Trash2Icon className="w-3.5 h-3.5" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5 */}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleViewDetails(appointment)}
                          >
                            <EyeIcon className="w-3.5 h-3.5" /> {/* Reduced w-4 h-4 to w-3.5 h-3.5 */}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4"> {/* Reduced mt-6 to mt-4 */}
              <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-[11px]"> {/* Reduced text-sm to text-[11px] */}
                {filteredAppointments.length === 0
                  ? "0 results"
                  : `${startIndex}-${endIndex} of ${filteredAppointments.length}`}
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
      {isModalOpen && selectedAppointment && (
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
                  {selectedAppointment.patient_name?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-lg">
                  {selectedAppointment.patient_name || "N/A"}
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                  Appointment Details
                </p>
              </div>
            </div>
            <div>
              <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                Appointment Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Patient Name
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAppointment.patient_name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Phone Number
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAppointment.phone_number || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Appointment Date
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAppointment.appointment_date || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Time
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAppointment.appointment_time || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Type
                  </p>
                  <Badge
                    className="rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-[10px] px-1.5 py-0.5"
                    style={{
                      backgroundColor: getTypeColor(selectedAppointment.type),
                      color: "white",
                    }}
                  >
                    {selectedAppointment.type || "N/A"}
                  </Badge>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    CHW Name
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedAppointment.chw_name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Status
                  </p>
                  <Badge className={`rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-[10px] px-2 py-0.5 ${getStatusBadgeColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Appointment Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8"
          onClick={handleCloseCreateModal}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-[800px] p-6 z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseCreateModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl mb-1">
                Add appointment
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                Capture details for the upcoming visit
              </p>
            </div>

            <form onSubmit={handleSubmitCreate} className="space-y-6">
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Appointment details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Patient Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter patient name"
                      value={editFormData.patient_name}
                      onChange={(e) => handleInputChange("patient_name", e.target.value)}
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
                      Appointment Date<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={editFormData.appointment_date}
                      onChange={(e) => handleInputChange("appointment_date", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Time<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="time"
                      value={editFormData.appointment_time}
                      onChange={(e) => handleInputChange("appointment_time", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Type<span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={editFormData.type}
                      onValueChange={(value) => handleInputChange("type", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue placeholder="select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type.name} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      CHW Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter CHW name"
                      value={editFormData.chw_name}
                      onChange={(e) => handleInputChange("chw_name", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
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
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Missed">Missed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseCreateModal}
                  className="h-auto px-6 py-2 rounded-[3px] border border-[#0000004c] bg-white text-[#001240] hover:bg-gray-50"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">
                    Cancel
                  </span>
                </Button>
                <Button
                  type="submit"
                  className="h-auto px-6 py-2 rounded-[3px] bg-[#001240] text-white hover:bg-[#001240]/90"
                >
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">
                    Save appointment
                  </span>
                </Button>
              </div>
            </form>
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
                Edit Appointment
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                Update appointment information
              </p>
            </div>
            <form onSubmit={handleSubmitEdit} className="space-y-6">
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Appointment Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Patient Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter patient name"
                      value={editFormData.patient_name}
                      onChange={(e) => handleInputChange("patient_name", e.target.value)}
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
                      Appointment Date<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={editFormData.appointment_date}
                      onChange={(e) => handleInputChange("appointment_date", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Time<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="time"
                      value={editFormData.appointment_time}
                      onChange={(e) => handleInputChange("appointment_time", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Type<span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={editFormData.type} 
                      onValueChange={(value) => handleInputChange("type", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue placeholder="select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type.name} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      CHW Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter CHW name"
                      value={editFormData.chw_name}
                      onChange={(e) => handleInputChange("chw_name", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
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
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Missed">Missed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">Update Appointment</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedAppointment && (
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
                Delete Appointment
              </h2>
            </div>
            <div className="mb-6">
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm leading-relaxed">
                Are you sure you want to delete this appointment? This action cannot be undone.
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