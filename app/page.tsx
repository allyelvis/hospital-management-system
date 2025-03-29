import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ClipboardList, Users, CreditCard, Activity, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">MediCare HMS</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Hospital Management System</h1>
            <p className="mt-2 text-muted-foreground">A comprehensive solution for healthcare facilities</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Patient Management</CardTitle>
                  <CardDescription>Manage patient records and history</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Register new patients, update information, and view medical history with ease.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/patients">View Module</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <CalendarDays className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>Schedule and manage appointments</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Book new appointments, reschedule existing ones, and send reminders to patients.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/appointments">View Module</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ClipboardList className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>Manage patient medical records</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Store and retrieve patient diagnoses, prescriptions, lab results, and treatment plans.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/records">View Module</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>Manage doctors, nurses and staff</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add new staff members, manage schedules, track performance, and handle payroll.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/staff">View Module</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Billing & Invoicing</CardTitle>
                  <CardDescription>Manage financial transactions</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Generate invoices, process payments, manage insurance claims, and track financial records.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/billing">View Module</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Settings className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system parameters</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customize system settings, manage user roles, and configure notifications.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/settings">View Module</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 MediCare Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}

