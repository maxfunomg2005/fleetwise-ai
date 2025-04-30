"use client"

import { CalendarIcon, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const upcomingServices = [
  {
    id: "SVC-1001",
    vehicle: "Truck #T-105",
    service: "Preventive Maintenance",
    date: "2023-05-02",
    time: "09:00 AM",
    priority: "medium",
  },
  {
    id: "SVC-1002",
    vehicle: "Truck #T-098",
    service: "Oil Change",
    date: "2023-05-03",
    time: "10:30 AM",
    priority: "low",
  },
  {
    id: "SVC-1003",
    vehicle: "Trailer #TR-062",
    service: "Brake Inspection",
    date: "2023-05-04",
    time: "02:00 PM",
    priority: "high",
  },
  {
    id: "SVC-1004",
    vehicle: "Truck #T-112",
    service: "Tire Rotation",
    date: "2023-05-05",
    time: "11:00 AM",
    priority: "medium",
  },
  {
    id: "SVC-1005",
    vehicle: "Truck #T-087",
    service: "Engine Diagnostics",
    date: "2023-05-08",
    time: "09:30 AM",
    priority: "high",
  },
]

export function UpcomingServiceCalendar() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {upcomingServices.map((service) => (
          <div key={service.id} className="flex items-start space-x-4 rounded-md border p-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{service.vehicle}</p>
                <Badge
                  variant={
                    service.priority === "high"
                      ? "destructive"
                      : service.priority === "medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {service.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{service.service}</p>
              <div className="flex items-center pt-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  <span>{service.date}</span>
                </div>
                <div className="ml-4 flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{service.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
