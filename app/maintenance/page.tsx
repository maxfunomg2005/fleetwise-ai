"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MaintenanceTable } from "@/components/maintenance-table"
import { AddMaintenanceDialog } from "@/components/add-maintenance-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MaintenancePage() {
  const [open, setOpen] = useState(false)

  return (
    <DashboardShell>
      <DashboardHeader heading="Maintenance Management" text="Track and manage maintenance tasks">
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <MaintenanceTable status="active" />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <MaintenanceTable status="completed" />
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <MaintenanceTable status="scheduled" />
        </TabsContent>
      </Tabs>
      <AddMaintenanceDialog open={open} onOpenChange={setOpen} />
    </DashboardShell>
  )
}
