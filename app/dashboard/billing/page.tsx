"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, FileText, MoreHorizontal, Plus, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample invoices data
const invoices = [
  {
    id: "INV001",
    patientName: "John Doe",
    patientId: "P001",
    date: "2025-03-15",
    amount: 350.0,
    status: "Paid",
    paymentMethod: "Credit Card",
    items: [
      { description: "Consultation", amount: 150.0 },
      { description: "Blood Test", amount: 200.0 },
    ],
  },
  {
    id: "INV002",
    patientName: "Jane Smith",
    patientId: "P002",
    date: "2025-03-10",
    amount: 500.0,
    status: "Pending",
    paymentMethod: "Insurance",
    items: [{ description: "MRI Scan", amount: 500.0 }],
  },
  {
    id: "INV003",
    patientName: "Robert Johnson",
    patientId: "P003",
    date: "2025-02-28",
    amount: 275.5,
    status: "Paid",
    paymentMethod: "Cash",
    items: [
      { description: "Consultation", amount: 150.0 },
      { description: "Prescription", amount: 125.5 },
    ],
  },
  {
    id: "INV004",
    patientName: "Emily Davis",
    patientId: "P004",
    date: "2025-03-22",
    amount: 180.0,
    status: "Overdue",
    paymentMethod: "Pending",
    items: [
      { description: "Consultation", amount: 150.0 },
      { description: "Prescription", amount: 30.0 },
    ],
  },
]

// Sample payments data
const payments = [
  {
    id: "PMT001",
    invoiceId: "INV001",
    patientName: "John Doe",
    date: "2025-03-15",
    amount: 350.0,
    method: "Credit Card",
    reference: "CARD-1234",
  },
  {
    id: "PMT002",
    invoiceId: "INV003",
    patientName: "Robert Johnson",
    date: "2025-02-28",
    amount: 275.5,
    method: "Cash",
    reference: "CASH-5678",
  },
]

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter payments based on search query
  const filteredPayments = payments.filter(
    (payment) =>
      payment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get selected invoice details
  const invoiceDetails = selectedInvoice ? invoices.find((invoice) => invoice.id === selectedInvoice) : null

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Billing & Invoicing</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Invoice
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by patient name, ID, or invoice number..."
            className="pl-8 w-full md:max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Manage patient invoices and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.length > 0 ? (
                        filteredInvoices.map((invoice) => (
                          <TableRow
                            key={invoice.id}
                            className={selectedInvoice === invoice.id ? "bg-muted/50" : ""}
                            onClick={() => setSelectedInvoice(invoice.id)}
                          >
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.patientName}</TableCell>
                            <TableCell>{invoice.patientId}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  invoice.status === "Paid"
                                    ? "default"
                                    : invoice.status === "Pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {invoice.status}
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
                                  <DropdownMenuItem>Record Payment</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Print Invoice
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No invoices found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {invoiceDetails && (
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details: {invoiceDetails.id}</CardTitle>
                  <CardDescription>
                    Patient: {invoiceDetails.patientName} ({invoiceDetails.patientId})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">{invoiceDetails.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <Badge
                          variant={
                            invoiceDetails.status === "Paid"
                              ? "default"
                              : invoiceDetails.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {invoiceDetails.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment Method</p>
                        <p className="text-sm text-muted-foreground">{invoiceDetails.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoiceDetails.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.description}</TableCell>
                              <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-bold">Total</TableCell>
                            <TableCell className="text-right font-bold">${invoiceDetails.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      {invoiceDetails.status !== "Paid" && (
                        <Button>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Record Payment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View and manage payment records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.invoiceId}</TableCell>
                            <TableCell>{payment.patientName}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>${payment.amount.toFixed(2)}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>{payment.reference}</TableCell>
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
                                  <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No payments found.
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

