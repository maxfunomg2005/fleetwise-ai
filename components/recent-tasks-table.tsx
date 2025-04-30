"use client"

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

const recentTasks = [
  {
    id: "TASK-1234",
    vehicle: "Truck #T-103",
    taskType: "Oil Change",
    cost: "$250.00",
    mechanic: "John Smith",
    date: "2023-04-25",
  },
  {
    id: "TASK-1235",
    vehicle: "Trailer #TR-056",
    taskType: "Brake Inspection",
    cost: "$180.00",
    mechanic: "Maria Rodriguez",
    date: "2023-04-24",
  },
  {
    id: "TASK-1236",
    vehicle: "Truck #T-087",
    taskType: "Tire Replacement",
    cost: "$1,200.00",
    mechanic: "David Johnson",
    date: "2023-04-23",
  },
  {
    id: "TASK-1237",
    vehicle: "Truck #T-092",
    taskType: "Engine Diagnostics",
    cost: "$350.00",
    mechanic: "John Smith",
    date: "2023-04-22",
  },
  {
    id: "TASK-1238",
    vehicle: "Trailer #TR-042",
    taskType: "Electrical Repair",
    cost: "$420.00",
    mechanic: "Maria Rodriguez",
    date: "2023-04-21",
  },
]

export function RecentTasksTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle</TableHead>
          <TableHead>Task Type</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Mechanic</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.vehicle}</TableCell>
            <TableCell>{task.taskType}</TableCell>
            <TableCell>{task.cost}</TableCell>
            <TableCell>{task.mechanic}</TableCell>
            <TableCell>{task.date}</TableCell>
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
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>View vehicle history</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Print report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
