import {
  BellIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  MenuIcon,
  MessageSquareIcon,
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
import { fetchCHWs } from "../../api/chwService";

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

const CHW_FORM_DEFAULT = {
  full_name: "",
  email: "",
  national_id: "",
  phone_number: "",
  gender: "",
  district: "",
  sector: "",
  cell: "",
  village: "",
  role_type: "",
  employment_type: "",
  start_date: "",
};

export const CHWManagement = () => {
  const [chwData, setChwData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedCHW, setSelectedCHW] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(CHW_FORM_DEFAULT);
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedChws = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startIndex = filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredData.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, locationFilter]);

  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (chw) => {
    setSelectedCHW(chw);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditFormData(CHW_FORM_DEFAULT);
    setSelectedCHW(null);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditFormData(CHW_FORM_DEFAULT);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCHW(null);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    // If date is already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    // Try to parse common date formats and convert to YYYY-MM-DD
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    } catch (e) {
      // If parsing fails, return empty string
    }
    return "";
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) return dateString;
    return parsed
      .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
      .replace(/\//g, " - ");
  };

  const handleEditCHW = (chw) => {
    setSelectedCHW(chw);
    // Pre-populate form with CHW data
    const startDate = chw.start_date || chw.date_joined || "";
    setEditFormData({
      full_name: chw.full_name || "",
      email: chw.email || "",
      national_id: chw.national_id || chw.nationalId || "",
      phone_number: chw.phone_number || "",
      gender: chw.gender || "",
      district: chw.district || "",
      sector: chw.sector || "",
      cell: chw.cell || "",
      village: chw.village || "",
      role_type: chw.role_type || chw.roleType || "",
      employment_type: chw.employment_type || chw.employmentType || "",
      start_date: formatDateForInput(startDate),
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCHW(null);
    setEditFormData(CHW_FORM_DEFAULT);
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!selectedCHW) return;

    const locationParts = [
      editFormData.district || selectedCHW.district,
      editFormData.sector || selectedCHW.sector,
    ].filter(Boolean);

    const updatedCHW = {
      ...selectedCHW,
      ...editFormData,
      location: locationParts.join(" / ") || selectedCHW.location || "",
      start_date: editFormData.start_date
        ? formatDateForDisplay(editFormData.start_date)
        : selectedCHW.start_date,
      status: selectedCHW.status || "Active",
    };

    setChwData((prev) => prev.map((chw) => (chw.id === selectedCHW.id ? updatedCHW : chw)));
    setSelectedCHW(updatedCHW);
    handleCloseEditModal();
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();

    const locationParts = [editFormData.district, editFormData.sector].filter(Boolean);
    const startDateDisplay = editFormData.start_date
      ? formatDateForDisplay(editFormData.start_date)
      : formatDateForDisplay(new Date().toISOString());

    const newCHW = {
      id: Date.now(),
      ...editFormData,
      location: locationParts.join(" / "),
      status: "Active",
      start_date: startDateDisplay,
    };

    setChwData((prev) => [newCHW, ...prev]);
    setCurrentPage(1);
    handleCloseCreateModal();
  };

  const handleDeleteCHW = (chw) => {
    setSelectedCHW(chw);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCHW(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedCHW) {
      // TODO: Implement API call to deactivate/delete CHW
      console.log("Deactivating CHW:", selectedCHW);
      // After successful deactivation, refresh the list and close modal
      await loadCHWs();
      handleCloseDeleteModal();
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

      <div className="flex-1 p-4 overflow-auto">
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
            {/* <Button
              variant="outline"
              className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
            >
              <MessageSquareIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                Message CHW
              </span>
            </Button> */}
            <Button className="h-auto px-4 py-2 rounded-[3px] bg-[#09111e]" onClick={handleOpenCreateModal}>
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Add CHW
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

        {/* < className="grid grid-cols-3 gap-4 mb-6">
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

          {/* <Card className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
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
          </Card> */}

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

            <Table className="text-sm"> {/* smaller default font for table */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] px-2 py-1">
                    {/* <Checkbox /> */}
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm px-2 py-1">
                    Full name
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm px-2 py-1">
                    Gender
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm px-2 py-1">
                    Phone number
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm px-2 py-1">
                    Location
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm px-2 py-1">
                    Start date
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm px-2 py-1">
                    Status
                  </TableHead>
                  <TableHead className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm px-2 py-1">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                        Loading...
                      </span>
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                        No CHWs found
                      </span>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedChws.map((chw, index) => (
                    <TableRow key={index} className="text-sm">
                      <TableCell className="px-2 py-1">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm px-2 py-1">
                        {chw.full_name}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm px-2 py-1">
                        {chw.gender}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm px-2 py-1">
                        {chw.phone_number}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm px-2 py-1">
                        {chw.location}
                      </TableCell>
                      <TableCell className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm px-2 py-1">
                        {chw.start_date}
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        <Badge
                          className={`rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-[10px] px-2 py-0.5 ${
                            chw.status === "Active"
                              ? "bg-[#d7f7e7] text-[#006633]"
                              : "bg-[#f5f5f5] text-[#666666]"
                          }`}
                        >
                          {chw.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => handleEditCHW(chw)}
                          >
                            <PencilIcon className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => handleDeleteCHW(chw)}
                          >
                            <Trash2Icon className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => handleViewDetails(chw)}
                          >
                            <EyeIcon className="w-3 h-3" />
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
                {filteredData.length === 0
                  ? "0 results"
                  : `${startIndex}-${endIndex} of ${filteredData.length}`}
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

      {/* Modal with blurred background */}
      {isModalOpen && selectedCHW && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8"
          onClick={handleCloseModal}
        >
          {/* Blurred backdrop - fixed */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          
          {/* Modal content */}
          <div 
            className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-[600px] p-6 z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with avatar and name */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {selectedCHW.full_name ? (
                  <span className="text-xl font-semibold text-gray-600">
                    {selectedCHW.full_name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <span className="text-xl font-semibold text-gray-600">?</span>
                )}
              </div>
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-lg">
                  {selectedCHW.full_name || "N/A"}
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                  {selectedCHW.id ? `USR-${String(selectedCHW.id).padStart(4, '0')}` : "USR-0000"}
                </p>
              </div>
            </div>

            {/* Personal Info Section */}
            <div>
              <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                Personal Info
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Full name
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedCHW.full_name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Gender
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedCHW.gender || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Phone number
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedCHW.phone_number || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Location
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedCHW.location || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Date Joined
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedCHW.start_date || selectedCHW.date_joined || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    National Id
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedCHW.national_id || selectedCHW.nationalId || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Form Modal */}
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
                Register CHW
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                Provide details to onboard a new community health worker
              </p>
            </div>

            <form onSubmit={handleSubmitCreate} className="space-y-6">
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Full name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter a full name"
                      value={editFormData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={editFormData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      National Id<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="16-digit Number"
                      value={editFormData.national_id}
                      onChange={(e) => handleInputChange("national_id", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Phone number<span className="text-red-500">*</span>
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
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={editFormData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue
                          placeholder="select a gender"
                          className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Area of Operation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      District<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter district"
                      value={editFormData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Sector<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter sector"
                      value={editFormData.sector}
                      onChange={(e) => handleInputChange("sector", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Cell<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter cell"
                      value={editFormData.cell}
                      onChange={(e) => handleInputChange("cell", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Village<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter village"
                      value={editFormData.village}
                      onChange={(e) => handleInputChange("village", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Role information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Role type<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter role type"
                      value={editFormData.role_type}
                      onChange={(e) => handleInputChange("role_type", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Employment type<span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={editFormData.employment_type}
                      onValueChange={(value) => handleInputChange("employment_type", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue
                          placeholder="select employment type"
                          className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={editFormData.start_date}
                  onChange={(e) => handleInputChange("start_date", e.target.value)}
                  className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                />
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
                    Register CHW
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Form Modal with blurred background */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8"
          onClick={handleCloseEditModal}
        >
          {/* Blurred backdrop - fixed */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          
          {/* Modal content */}
          <div 
            className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-[800px] p-6 z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseEditModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl mb-1">
                Edit CHW
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                Update CHW information in your organization
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitEdit} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Full name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter a full name"
                      value={editFormData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={editFormData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      National Id<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="16-digit Number"
                      value={editFormData.national_id}
                      onChange={(e) => handleInputChange("national_id", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Phone number<span className="text-red-500">*</span>
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
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={editFormData.gender} 
                      onValueChange={(value) => handleInputChange("gender", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue
                          placeholder="select a gender"
                          className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Area of Operation Section */}
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Area of Operation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      District<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter district"
                      value={editFormData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Sector<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter sector"
                      value={editFormData.sector}
                      onChange={(e) => handleInputChange("sector", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Cell<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter cell"
                      value={editFormData.cell}
                      onChange={(e) => handleInputChange("cell", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Village<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter village"
                      value={editFormData.village}
                      onChange={(e) => handleInputChange("village", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Role Information Section */}
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
                  Role information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Role type<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter role type"
                      value={editFormData.role_type}
                      onChange={(e) => handleInputChange("role_type", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Employment type<span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={editFormData.employment_type} 
                      onValueChange={(value) => handleInputChange("employment_type", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue
                          placeholder="select employment type"
                          className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Start Date Section */}
              <div>
                <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={editFormData.start_date}
                  onChange={(e) => handleInputChange("start_date", e.target.value)}
                  className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseEditModal}
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
                    Update CHW
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal with blurred background */}
      {isDeleteModalOpen && selectedCHW && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8"
          onClick={handleCloseDeleteModal}
        >
          {/* Blurred backdrop - fixed */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          
          {/* Modal content */}
          <div 
            className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-[500px] p-6 z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseDeleteModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Power className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl">
                Deactivate CHW
              </h2>
            </div>

            {/* Confirmation message */}
            <div className="mb-6">
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm leading-relaxed">
                Are you sure you want to deactivate this user? They will no longer have access to the system until reactivated.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                onClick={handleConfirmDelete}
                className="h-auto px-6 py-2 rounded-[3px] bg-[#001240] text-white hover:bg-[#001240]/90"
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">
                  Confirm
                </span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDeleteModal}
                className="h-auto px-6 py-2 rounded-[3px] border border-[#0000004c] bg-white text-[#000000] hover:bg-gray-50"
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">
                  Cancel
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
