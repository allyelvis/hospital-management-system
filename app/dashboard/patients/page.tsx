"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, UserPlus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample patient data
const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "+1 (555) 123-4567",
    lastVisit: "2025-03-15",
    status: "Active",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    contact: "+1 (555) 987-6543",
    lastVisit: "2025-03-10",
    status: "Active",
  },
  {
    id: "P003",
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    contact: "+1 (555) 456-7890",
    lastVisit: "2025-02-28",
    status: "Inactive",
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    contact: "+1 (555) 234-5678",
    lastVisit: "2025-03-22",
    status: "Active",
  },
  {
    id: "P005",
    name: "Michael Wilson",
    age: 41,
    gender: "Male",
    contact: "+1 (555) 876-5432",
    lastVisit: "2025-03-05",
    status: "Active",
  },
]

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patients Directory</CardTitle>
            <CardDescription>Manage and view all patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Patients</DropdownMenuItem>
                  <DropdownMenuItem>Active Patients</DropdownMenuItem>
                  <DropdownMenuItem>Inactive Patients</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.contact}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>
                          <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                            {patient.status}
                          </Badge>
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                              <DropdownMenuItem>Medical History</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No patients found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

