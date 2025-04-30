"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EditVehicleDialog } from "@/components/edit-vehicle-dialog"

interface FleetTableProps {
  vehicleType: "truck" | "trailer"
}

const trucks = [
  {
    id: "T-103",
    model: "Freightliner Cascadia",
    vin: "1FUJGBDV9CLBP8898",
    licensePlate: "ABC1234",
    status: "Available",
    odometer: 125000,
    nextServiceDue: "2023-05-15",
  },
  {
    id: "T-087",
    model: "Kenworth T680",
    vin: "2NKHHM6X9HM165275",
    licensePlate: "XYZ5678",
    status: "In Shop",
    odometer: 98000,
    nextServiceDue: "2023-05-02",
  },
  {
    id: "T-092",
    model: "Peterbilt 579",
    vin: "1XPBD99X9KD456789",
    licensePlate: "DEF9012",
    status: "Available",
    odometer: 110000,
    nextServiceDue: "2023-06-10",
  },
  {
    id: "T-105",
    model: "Volvo VNL 860",
    vin: "4V4NC9EH9LN123456",
    licensePlate: "GHI3456",
    status: "Available",
    odometer: 85000,
    nextServiceDue: "2023-05-20",
  },
  {
    id: "T-112",
    model: "Mack Anthem",
    vin: "1M1AN07Y9KM987654",
    licensePlate: "JKL7890",
    status: "In Shop",
    odometer: 72000,
    nextServiceDue: "2023-05-05",
  },
]

const trailers = [
  {
    id: "TR-056",
    model: "Great Dane Dry Van",
    vin: "1GRAA06Y9KM123456",
    licensePlate: "TRL1234",
    status: "Available",
    odometer: 0,
    nextServiceDue: "2023-06-15",
  },
  {
    id: "TR-042",
    model: "Utility Reefer",
    vin: "1UYVS2534JM789012",
    licensePlate: "TRL5678",
    status: "Available",
    odometer: 0,
    nextServiceDue: "2023-05-25",
  },
  {
    id: "TR-062",
    model: "Wabash Dry Van",
    vin: "1JJV532D9LR345678",
    licensePlate: "TRL9012",
    status: "In Shop",
    odometer: 0,
    nextServiceDue: "2023-05-10",
  },
  {
    id: "TR-071",
    model: "Fontaine Flatbed",
    vin: "13N1432C9KR901234",
    licensePlate: "TRL3456",
    status: "Available",
    odometer: 0,
    nextServiceDue: "2023-06-05",
  },
  {
    id: "TR-083",
    model: "Wilson Grain Trailer",
    vin: "1WGN4576X9HR567890",
    licensePlate: "TRL7890",
    status: "Available",
    odometer: 0,
    nextServiceDue: "2023-06-20",
  },
]

export function FleetTable({ vehicleType }: FleetTableProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  const vehicles = vehicleType === "truck" ? trucks : trailers

  const handleEdit = (vehicle: any) => {
    // Make sure we have all required fields with proper types
    const preparedVehicle = {
      ...vehicle,
      // Ensure odometer is a number for trucks
      ...(vehicleType === "truck" && { odometer: Number(vehicle.odometer.replace(/,/g, "")) }),
    }
    setSelectedVehicle(preparedVehicle)
    setEditOpen(true)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead>Status</TableHead>
            {vehicleType === "truck" && <TableHead>Odometer</TableHead>}
            <TableHead>Next Service Due</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.id}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.vin}</TableCell>
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell>
                <Badge variant={vehicle.status === "Available" ? "outline" : "secondary"}>{vehicle.status}</Badge>
              </TableCell>
              {vehicleType === "truck" && <TableCell>{vehicle.odometer.toLocaleString()} mi</TableCell>}
              <TableCell>{vehicle.nextServiceDue}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(vehicle)}>Edit details</DropdownMenuItem>
                    <DropdownMenuItem>View maintenance history</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View documents</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedVehicle && (
        <EditVehicleDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          vehicle={selectedVehicle}
          vehicleType={vehicleType}
        />
      )}
    </>
  )
}
