"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample staff data
const staffMembers = [
  {
    id: "S001",
    name: "Dr. Sarah Wilson",
    role: "Doctor",
    department: "Cardiology",
    specialization: "Cardiologist",
    contact: "+1 (555) 111-2222",
    email: "sarah.wilson@medicare.com",
    status: "Active",
  },
  {
    id: "S002",
    name: "Dr. Michael Brown",
    role: "Doctor",
    department: "Neurology",
    specialization: "Neurologist",
    contact: "+1 (555) 222-3333",
    email: "michael.brown@medicare.com",
    status: "Active",
  },
  {
    id: "S003",
    name: "Dr. Emily Davis",
    role: "Doctor",
    department: "Orthopedics",
    specialization: "Orthopedic Surgeon",
    contact: "+1 (555) 333-4444",
    email: "emily.davis@medicare.com",
    status: "On Leave",
  },
  {
    id: "S004",
    name: "Dr. James Wilson",
    role: "Doctor",
    department: "Dermatology",
    specialization: "Dermatologist",
    contact: "+1 (555) 444-5555",
    email: "james.wilson@medicare.com",
    status: "Active",
  },
  {
    id: "S005",
    name: "Nurse Jennifer Adams",
    role: "Nurse",
    department: "Cardiology",
    specialization: "Cardiac Nurse",
    contact: "+1 (555) 555-6666",
    email: "jennifer.adams@medicare.com",
    status: "Active",
  },
  {
    id: "S006",
    name: "Nurse Robert Taylor",
    role: "Nurse",
    department: "Emergency",
    specialization: "ER Nurse",
    contact: "+1 (555) 666-7777",
    email: "robert.taylor@medicare.com",
    status: "Active",
  },
  {
    id: "S007",
    name: "Lisa Johnson",
    role: "Receptionist",
    department: "Administration",
    specialization: "Front Desk",
    contact: "+1 (555) 777-8888",
    email: "lisa.johnson@medicare.com",
    status: "Active",
  },
]

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")

  // Filter staff based on search query and role filter
  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "All" || staff.role === roleFilter

    return matchesSearch && matchesRole
  })

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>Manage doctors, nurses, and other staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search staff..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button
                  variant={roleFilter === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoleFilter("All")}
                >
                  All
                </Button>
                <Button
                  variant={roleFilter === "Doctor" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoleFilter("Doctor")}
                >
                  Doctors
                </Button>
                <Button
                  variant={roleFilter === "Nurse" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoleFilter("Nurse")}
                >
                  Nurses
                </Button>
                <Button
                  variant={roleFilter === "Receptionist" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoleFilter("Receptionist")}
                >
                  Staff
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell className="font-medium">{staff.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={staff.name} />
                              <AvatarFallback>
                                {staff.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {staff.name}
                          </div>
                        </TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>{staff.specialization}</TableCell>
                        <TableCell>{staff.contact}</TableCell>
                        <TableCell>
                          <Badge variant={staff.status === "Active" ? "default" : "secondary"}>{staff.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>View Schedule</DropdownMenuItem>
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No staff members found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

