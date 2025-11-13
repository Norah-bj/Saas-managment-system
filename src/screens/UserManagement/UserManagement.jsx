import React, { useState, useEffect } from "react";
import {
  BellIcon,
  DownloadIcon,
  EyeIcon,
  MenuIcon,
  PencilIcon,
  PlusIcon,
  Power,
  SearchIcon,
  Trash2Icon,
  RotateCcwIcon,
  X,
} from "lucide-react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
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
    title: "Total registered mothers",
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Pregnant mothers",
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Total children",
    value: "1,287",
    change: "+45 this week",
  },
  {
    title: "Sick users",
    value: "89",
    change: "+12 from last month",
  },
];

const userData = [
  {
    userId: "AME-100315",
    fullName: "Kabera John",
    nationalId: "+250733333333",
    cell: "Kabuye",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100316",
    fullName: "Mukamana Alice",
    nationalId: "+250722222222",
    cell: "Gisozi",
    insurance: "RSSB",
    healthStatus: "SICK",
  },
  {
    userId: "AME-100317",
    fullName: "Niyonsenga Peter",
    nationalId: "+250711111111",
    cell: "Nyamirambo",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100318",
    fullName: "Uwase Diane",
    nationalId: "+250700000000",
    cell: "Kicukiro",
    insurance: "Private",
    healthStatus: "SICK",
  },
  {
    userId: "AME-100319",
    fullName: "Habimana Eric",
    nationalId: "+250799999999",
    cell: "Remera",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100320",
    fullName: "Umutoni Grace",
    nationalId: "+250744444444",
    cell: "Kimironko",
    insurance: "RSSB",
    healthStatus: "SICK",
  },
  {
    userId: "AME-100321",
    fullName: "Nyirabagenzi Lea",
    nationalId: "+250755555555",
    cell: "Rusororo",
    insurance: "Mutuelle",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100322",
    fullName: "Gasana Patrick",
    nationalId: "+250766666666",
    cell: "Ndera",
    insurance: "Private",
    healthStatus: "SICK",
  },
  {
    userId: "AME-100323",
    fullName: "Mukandayisenga Olive",
    nationalId: "+250777777777",
    cell: "Kabeza",
    insurance: "RSSB",
    healthStatus: "CLEAN",
  },
  {
    userId: "AME-100324",
    fullName: "Twagirayezu Bosco",
    nationalId: "+250788888888",
    cell: "Gikondo",
    insurance: "Mutuelle",
    healthStatus: "SICK",
  },
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    userId: "",
    fullName: "",
    nationalId: "",
    cell: "",
    insurance: "",
    healthStatus: "",
  });
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = userData.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.healthStatus.toLowerCase() === statusFilter.toLowerCase();

    const matchesLocation =
      locationFilter === "all" ||
      user.cell.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startIndex = filteredUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredUsers.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, locationFilter]);

  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
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

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      userId: user.userId || "",
      fullName: user.fullName || "",
      nationalId: user.nationalId || "",
      cell: user.cell || "",
      insurance: user.insurance || "",
      healthStatus: user.healthStatus || "",
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditFormData({
      userId: "",
      fullName: "",
      nationalId: "",
      cell: "",
      insurance: "",
      healthStatus: "",
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
    // TODO: Implement API call to update user
    console.log("Updating user:", editFormData);
    // After successful update, refresh the list and close modal
    handleCloseEditModal();
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      // TODO: Implement API call to deactivate/delete user
      console.log("Deactivating user:", selectedUser);
      // After successful deactivation, refresh the list and close modal
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
            <MenuIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Top title section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl mb-1">
              User management
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
              Manage mothers, pregnant women, children, and CHWs in the system
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                Export CSV
              </span>
            </Button>
            {/* <Button className="h-auto px-4 py-2 rounded-[3px] bg-[#09111e]">
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm">
                Add appointment
              </span>
            </Button> */}
          </div>
        </div>

        {/* Stats Section */}
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

        {/* Table Section */}
        <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
          <CardContent className="p-6">
            {/* Filters */}
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
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="sick">Sick</SelectItem>
                  </SelectContent>
                </Select>

                {/* Location Filter */}
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[150px] h-[38px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    <SelectItem value="Kabuye">Kabuye</SelectItem>
                    <SelectItem value="Gisozi">Gisozi</SelectItem>
                    <SelectItem value="Kicukiro">Kicukiro</SelectItem>
                    <SelectItem value="Nyamirambo">Nyamirambo</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export & Refresh */}
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

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table className="text-sm"> {/* reduced default font size */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] px-2 py-1">
                      {/* <Checkbox /> */}
                    </TableHead>
                    <TableHead className="px-2 py-1">Userid</TableHead>
                    <TableHead className="px-2 py-1">Full name</TableHead>
                    <TableHead className="px-2 py-1">National ID</TableHead>
                    <TableHead className="px-2 py-1">Cell</TableHead>
                    <TableHead className="px-2 py-1">Insurance</TableHead>
                    <TableHead className="px-2 py-1">Health status</TableHead>
                    <TableHead className="px-2 py-1">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-sm text-[#000000a6]">
                        No users match the selected filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <TableRow key={user.userId} className="text-sm"> {/* smaller font for rows */}
                        <TableCell className="px-2 py-1">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="px-2 py-1">{user.userId}</TableCell>
                        <TableCell className="px-2 py-1">{user.fullName}</TableCell>
                        <TableCell className="px-2 py-1">{user.nationalId}</TableCell>
                        <TableCell className="px-2 py-1">{user.cell}</TableCell>
                        <TableCell className="px-2 py-1">{user.insurance}</TableCell>
                        <TableCell className="px-2 py-1">
                          <Badge
                            variant="secondary"
                            className={`${
                              user.healthStatus === "SICK"
                                ? "bg-[#fde7e7] text-[#b00000]"
                                : "bg-[#d7f7e7] text-[#006633]"
                            } rounded-[3px] font-normal text-[10px] px-2 py-0.5`}
                          >
                            {user.healthStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          <div className="flex items-center gap-1"> {/* slightly tighter buttons */}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => handleEditUser(user)}
                            >
                              <PencilIcon className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => handleViewDetails(user)}
                            >
                              <EyeIcon className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2Icon className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                {filteredUsers.length === 0
                  ? "0 results"
                  : `${startIndex}-${endIndex} of ${filteredUsers.length}`}
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

      {/* View Details Modal with blurred background */}
      {isModalOpen && selectedUser && (
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
                {selectedUser.fullName ? (
                  <span className="text-xl font-semibold text-gray-600">
                    {selectedUser.fullName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <span className="text-xl font-semibold text-gray-600">?</span>
                )}
              </div>
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-lg">
                  {selectedUser.fullName || "N/A"}
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                  {selectedUser.userId || "N/A"}
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
                    {selectedUser.fullName || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    User ID
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedUser.userId || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    National ID / Phone
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedUser.nationalId || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Cell
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedUser.cell || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Insurance
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                    {selectedUser.insurance || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs mb-1">
                    Health Status
                  </p>
                  <Badge
                    className={`rounded-[3px] [font-family:'Poppins',Helvetica] font-normal text-[10px] px-2 py-0.5 ${
                      selectedUser.healthStatus === "SICK"
                        ? "bg-[#fde7e7] text-[#b00000]"
                        : "bg-[#d7f7e7] text-[#006633]"
                    }`}
                  >
                    {selectedUser.healthStatus || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>
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
                Edit User
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                Update user information in your organization
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
                      placeholder="Enter full name"
                      value={editFormData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      User ID<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter user ID"
                      value={editFormData.userId}
                      onChange={(e) => handleInputChange("userId", e.target.value)}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm h-[38px] rounded-[3px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      National ID / Phone<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter national ID or phone"
                      value={editFormData.nationalId}
                      onChange={(e) => handleInputChange("nationalId", e.target.value)}
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
                      Insurance<span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={editFormData.insurance} 
                      onValueChange={(value) => handleInputChange("insurance", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue
                          placeholder="select insurance"
                          className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mutuelle">Mutuelle</SelectItem>
                        <SelectItem value="RSSB">RSSB</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-1">
                      Health Status<span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={editFormData.healthStatus} 
                      onValueChange={(value) => handleInputChange("healthStatus", value)}
                    >
                      <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                        <SelectValue
                          placeholder="select health status"
                          className="[font-family:'Poppins',Helvetica] font-normal text-[#000000b0] text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CLEAN">CLEAN</SelectItem>
                        <SelectItem value="SICK">SICK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
                    Update User
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal with blurred background */}
      {isDeleteModalOpen && selectedUser && (
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
                Deactivate User
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
