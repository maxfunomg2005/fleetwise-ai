"use client"

import { AlertTriangle, CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const inspectionAlerts = [
  {
    id: "INSP-1001",
    vehicle: "Truck #T-087",
    inspectionType: "DOT Inspection",
    status: "expired",
    expiryDate: "2023-04-15",
    daysOverdue: 10,
  },
  {
    id: "INSP-1002",
    vehicle: "Trailer #TR-056",
    inspectionType: "Annual Inspection",
    status: "expired",
    expiryDate: "2023-04-20",
    daysOverdue: 5,
  },
  {
    id: "INSP-1003",
    vehicle: "Truck #T-103",
    inspectionType: "Emissions Test",
    status: "upcoming",
    expiryDate: "2023-05-05",
    daysRemaining: 10,
  },
  {
    id: "INSP-1004",
    vehicle: "Truck #T-092",
    inspectionType: "DOT Inspection",
    status: "upcoming",
    expiryDate: "2023-05-10",
    daysRemaining: 15,
  },
  {
    id: "INSP-1005",
    vehicle: "Trailer #TR-042",
    inspectionType: "Annual Inspection",
    status: "upcoming",
    expiryDate: "2023-05-15",
    daysRemaining: 20,
  },
]

export function VehicleInspectionAlerts() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {inspectionAlerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-4 rounded-md border p-3">
            {alert.status === "expired" ? (
              <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-muted-foreground" />
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{alert.vehicle}</p>
                <Badge variant={alert.status === "expired" ? "destructive" : "outline"}>{alert.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.inspectionType}</p>
              <p className="text-xs text-muted-foreground">
                {alert.status === "expired"
                  ? `Expired on ${alert.expiryDate} (${alert.daysOverdue} days overdue)`
                  : `Expires on ${alert.expiryDate} (${alert.daysRemaining} days remaining)`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
