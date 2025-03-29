"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CalendarPlus, MoreHorizontal } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample appointment data
const appointments = [
  {
    id: "A001",
    patientName: "John Doe",
    patientId: "P001",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2025-03-28",
    time: "09:00 AM",
    status: "Scheduled",
  },
  {
    id: "A002",
    patientName: "Jane Smith",
    patientId: "P002",
    doctor: "Dr. Michael Brown",
    department: "Neurology",
    date: "2025-03-28",
    time: "10:30 AM",
    status: "Completed",
  },
  {
    id: "A003",
    patientName: "Robert Johnson",
    patientId: "P003",
    doctor: "Dr. Emily Davis",
    department: "Orthopedics",
    date: "2025-03-28",
    time: "01:15 PM",
    status: "Cancelled",
  },
  {
    id: "A004",
    patientName: "Emily Davis",
    patientId: "P004",
    doctor: "Dr. James Wilson",
    department: "Dermatology",
    date: "2025-03-28",
    time: "03:00 PM",
    status: "Scheduled",
  },
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    if (!date) return true
    return appointment.date === date.toISOString().split("T")[0]
  })

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Appointment Management</h1>
          <Button>
            <CalendarPlus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-[300px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{date ? <>Appointments for {date.toLocaleDateString()}</> : <>All Appointments</>}</CardTitle>
              <CardDescription>Manage and view scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.id}</TableCell>
                          <TableCell>{appointment.patientName}</TableCell>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>{appointment.department}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                appointment.status === "Scheduled"
                                  ? "default"
                                  : appointment.status === "Completed"
                                    ? "success"
                                    : "destructive"
                              }
                            >
                              {appointment.status}
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
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No appointments found for this date.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

