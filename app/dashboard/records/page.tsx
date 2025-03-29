"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ClipboardPlus, Download, FileText, MoreHorizontal, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample medical records data
const medicalRecords = [
  {
    id: "MR001",
    patientName: "John Doe",
    patientId: "P001",
    recordType: "Diagnosis",
    doctor: "Dr. Sarah Wilson",
    date: "2025-03-15",
    department: "Cardiology",
  },
  {
    id: "MR002",
    patientName: "John Doe",
    patientId: "P001",
    recordType: "Lab Results",
    doctor: "Dr. Sarah Wilson",
    date: "2025-03-15",
    department: "Cardiology",
  },
  {
    id: "MR003",
    patientName: "Jane Smith",
    patientId: "P002",
    recordType: "Prescription",
    doctor: "Dr. Michael Brown",
    date: "2025-03-10",
    department: "Neurology",
  },
  {
    id: "MR004",
    patientName: "Jane Smith",
    patientId: "P002",
    recordType: "Treatment Plan",
    doctor: "Dr. Michael Brown",
    date: "2025-03-10",
    department: "Neurology",
  },
  {
    id: "MR005",
    patientName: "Robert Johnson",
    patientId: "P003",
    recordType: "Surgery Notes",
    doctor: "Dr. Emily Davis",
    date: "2025-02-28",
    department: "Orthopedics",
  },
]

// Sample prescriptions data
const prescriptions = [
  {
    id: "PR001",
    patientName: "John Doe",
    patientId: "P001",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet daily",
    doctor: "Dr. Sarah Wilson",
    issueDate: "2025-03-15",
    duration: "30 days",
  },
  {
    id: "PR002",
    patientName: "Jane Smith",
    patientId: "P002",
    medication: "Amoxicillin 500mg",
    dosage: "1 capsule every 8 hours",
    doctor: "Dr. Michael Brown",
    issueDate: "2025-03-10",
    duration: "7 days",
  },
  {
    id: "PR003",
    patientName: "Robert Johnson",
    patientId: "P003",
    medication: "Ibuprofen 400mg",
    dosage: "1 tablet every 6 hours as needed",
    doctor: "Dr. Emily Davis",
    issueDate: "2025-02-28",
    duration: "10 days",
  },
]

// Sample lab results data
const labResults = [
  {
    id: "LR001",
    patientName: "John Doe",
    patientId: "P001",
    testName: "Complete Blood Count",
    orderedBy: "Dr. Sarah Wilson",
    testDate: "2025-03-14",
    resultDate: "2025-03-15",
    status: "Completed",
  },
  {
    id: "LR002",
    patientName: "Jane Smith",
    patientId: "P002",
    testName: "Lipid Panel",
    orderedBy: "Dr. Michael Brown",
    testDate: "2025-03-09",
    resultDate: "2025-03-10",
    status: "Completed",
  },
  {
    id: "LR003",
    patientName: "Emily Davis",
    patientId: "P004",
    testName: "Thyroid Function Test",
    orderedBy: "Dr. James Wilson",
    testDate: "2025-03-22",
    resultDate: "",
    status: "Pending",
  },
]

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter records based on search query
  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredLabResults = labResults.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <Button>
            <ClipboardPlus className="mr-2 h-4 w-4" />
            Add New Record
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search records by patient name, ID, or record ID..."
            className="pl-8 w-full md:max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all-records" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all-records">All Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          </TabsList>

          <TabsContent value="all-records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>View and manage all patient medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.length > 0 ? (
                        filteredRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.id}</TableCell>
                            <TableCell>{record.patientName}</TableCell>
                            <TableCell>{record.patientId}</TableCell>
                            <TableCell>{record.recordType}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.department}</TableCell>
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
                                  <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No records found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>View and manage patient prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prescription ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrescriptions.length > 0 ? (
                        filteredPrescriptions.map((prescription) => (
                          <TableRow key={prescription.id}>
                            <TableCell className="font-medium">{prescription.id}</TableCell>
                            <TableCell>{prescription.patientName}</TableCell>
                            <TableCell>{prescription.medication}</TableCell>
                            <TableCell>{prescription.dosage}</TableCell>
                            <TableCell>{prescription.doctor}</TableCell>
                            <TableCell>{prescription.issueDate}</TableCell>
                            <TableCell>{prescription.duration}</TableCell>
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
                                  <DropdownMenuItem>Renew Prescription</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Print
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No prescriptions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab-results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Results</CardTitle>
                <CardDescription>View and manage patient lab test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Result ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Ordered By</TableHead>
                        <TableHead>Test Date</TableHead>
                        <TableHead>Result Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLabResults.length > 0 ? (
                        filteredLabResults.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium">{result.id}</TableCell>
                            <TableCell>{result.patientName}</TableCell>
                            <TableCell>{result.testName}</TableCell>
                            <TableCell>{result.orderedBy}</TableCell>
                            <TableCell>{result.testDate}</TableCell>
                            <TableCell>{result.resultDate || "—"}</TableCell>
                            <TableCell>
                              <Badge variant={result.status === "Completed" ? "default" : "secondary"}>
                                {result.status}
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
                                  <DropdownMenuItem>Update Status</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No lab results found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

