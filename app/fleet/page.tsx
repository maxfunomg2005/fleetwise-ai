"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FleetTable } from "@/components/fleet-table"
import { AddVehicleDialog } from "@/components/add-vehicle-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FleetPage() {
  const [open, setOpen] = useState(false)
  const [vehicleType, setVehicleType] = useState<"truck" | "trailer">("truck")

  const handleAddVehicle = () => {
    setOpen(true)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Fleet Management" text="Manage your trucks and trailers">
        <Button onClick={handleAddVehicle}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </DashboardHeader>
      <Tabs
        defaultValue="trucks"
        className="space-y-4"
        onValueChange={(value) => setVehicleType(value as "truck" | "trailer")}
      >
        <TabsList>
          <TabsTrigger value="truck">Trucks</TabsTrigger>
          <TabsTrigger value="trailer">Trailers</TabsTrigger>
        </TabsList>
        <TabsContent value="truck" className="space-y-4">
          <FleetTable vehicleType="truck" />
        </TabsContent>
        <TabsContent value="trailer" className="space-y-4">
          <FleetTable vehicleType="trailer" />
        </TabsContent>
      </Tabs>
      <AddVehicleDialog open={open} onOpenChange={setOpen} vehicleType={vehicleType} />
    </DashboardShell>
  )
}
