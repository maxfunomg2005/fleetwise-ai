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
import { Badge } from "@/components/ui/badge"

interface MaintenanceTableProps {
  status: "active" | "completed" | "scheduled"
}

const activeTasks = [
  {
    id: "TASK-1001",
    vehicle: "Truck #T-103",
    taskType: "Oil Change",
    assignedTo: "John Smith",
    startDate: "2023-04-28",
    estimatedCompletion: "2023-04-29",
    priority: "medium",
    status: "in progress",
  },
  {
    id: "TASK-1002",
    vehicle: "Truck #T-087",
    taskType: "Engine Diagnostics",
    assignedTo: "Maria Rodriguez",
    startDate: "2023-04-27",
    estimatedCompletion: "2023-04-30",
    priority: "high",
    status: "in progress",
  },
  {
    id: "TASK-1003",
    vehicle: "Trailer #TR-056",
    taskType: "Brake Inspection",
    assignedTo: "David Johnson",
    startDate: "2023-04-28",
    estimatedCompletion: "2023-04-28",
    priority: "high",
    status: "in progress",
  },
]

const completedTasks = [
  {
    id: "TASK-1234",
    vehicle: "Truck #T-103",
    taskType: "Oil Change",
    assignedTo: "John Smith",
    completionDate: "2023-04-25",
    cost: "$250.00",
    notes: "Replaced oil filter as well",
  },
  {
    id: "TASK-1235",
    vehicle: "Trailer #TR-056",
    taskType: "Brake Inspection",
    assignedTo: "Maria Rodriguez",
    completionDate: "2023-04-24",
    cost: "$180.00",
    notes: "Brake pads at 60%, no replacement needed",
  },
  {
    id: "TASK-1236",
    vehicle: "Truck #T-087",
    taskType: "Tire Replacement",
    assignedTo: "David Johnson",
    completionDate: "2023-04-23",
    cost: "$1,200.00",
    notes: "Replaced all drive tires",
  },
]

const scheduledTasks = [
  {
    id: "TASK-1004",
    vehicle: "Truck #T-105",
    taskType: "Preventive Maintenance",
    assignedTo: "John Smith",
    scheduledDate: "2023-05-02",
    estimatedDuration: "4 hours",
    priority: "medium",
  },
  {
    id: "TASK-1005",
    vehicle: "Truck #T-098",
    taskType: "Oil Change",
    assignedTo: "Maria Rodriguez",
    scheduledDate: "2023-05-03",
    estimatedDuration: "1 hour",
    priority: "low",
  },
  {
    id: "TASK-1006",
    vehicle: "Trailer #TR-062",
    taskType: "Brake Inspection",
    assignedTo: "David Johnson",
    scheduledDate: "2023-05-04",
    estimatedDuration: "2 hours",
    priority: "high",
  },
]

export function MaintenanceTable({ status }: MaintenanceTableProps) {
  if (status === "active") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task ID</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Task Type</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Est. Completion</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.vehicle}</TableCell>
              <TableCell>{task.taskType}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.startDate}</TableCell>
              <TableCell>{task.estimatedCompletion}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{task.status}</Badge>
              </TableCell>
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
                    <DropdownMenuItem>Edit task</DropdownMenuItem>
                    <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  if (status === "completed") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task ID</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Task Type</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Completion Date</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {completedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.vehicle}</TableCell>
              <TableCell>{task.taskType}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.completionDate}</TableCell>
              <TableCell>{task.cost}</TableCell>
              <TableCell>{task.notes}</TableCell>
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task ID</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Task Type</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Scheduled Date</TableHead>
          <TableHead>Est. Duration</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduledTasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell>{task.vehicle}</TableCell>
            <TableCell>{task.taskType}</TableCell>
            <TableCell>{task.assignedTo}</TableCell>
            <TableCell>{task.scheduledDate}</TableCell>
            <TableCell>{task.estimatedDuration}</TableCell>
            <TableCell>
              <Badge
                variant={
                  task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                }
              >
                {task.priority}
              </Badge>
            </TableCell>
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
                  <DropdownMenuItem>Edit task</DropdownMenuItem>
                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Start task</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
