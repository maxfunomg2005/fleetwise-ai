"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const truckFormSchema = z.object({
  id: z.string().min(1, "ID is required"),
  model: z.string().min(1, "Model is required"),
  vin: z.string().min(17, "VIN must be 17 characters").max(17),
  licensePlate: z.string().min(1, "License plate is required"),
  status: z.enum(["Available", "In Shop"]),
  odometer: z.coerce.number().min(0, "Odometer must be a positive number"),
  nextServiceDue: z.string().min(1, "Next service date is required"),
  notes: z.string().optional(),
})

const trailerFormSchema = z.object({
  id: z.string().min(1, "ID is required"),
  model: z.string().min(1, "Model is required"),
  vin: z.string().min(17, "VIN must be 17 characters").max(17),
  licensePlate: z.string().min(1, "License plate is required"),
  status: z.enum(["Available", "In Shop"]),
  nextServiceDue: z.string().min(1, "Next service date is required"),
  notes: z.string().optional(),
})

interface EditVehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any
  vehicleType: "truck" | "trailer"
}

export function EditVehicleDialog({ open, onOpenChange, vehicle, vehicleType }: EditVehicleDialogProps) {
  const formSchema = vehicleType === "truck" ? truckFormSchema : trailerFormSchema

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: vehicle.id,
      model: vehicle.model,
      vin: vehicle.vin,
      licensePlate: vehicle.licensePlate,
      status: vehicle.status,
      ...(vehicleType === "truck" && { odometer: vehicle.odometer }),
      nextServiceDue: vehicle.nextServiceDue,
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            Edit {vehicleType === "truck" ? "Truck" : "Trailer"} - {vehicle.id}
          </DialogTitle>
          <DialogDescription>
            Update the details for this {vehicleType === "truck" ? "truck" : "trailer"}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VIN</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Available">Available</SelectItem>
                              <SelectItem value="In Shop">In Shop</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {vehicleType === "truck" && (
                      <FormField
                        control={form.control}
                        name="odometer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Odometer (miles)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="nextServiceDue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Next Service Due</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Registration</CardTitle>
                        <CardDescription>Vehicle registration document</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span>{vehicle.id}_registration.pdf</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" className="w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Inspection</CardTitle>
                        <CardDescription>Latest inspection document</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span>{vehicle.id}_inspection.pdf</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" className="w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Documents</CardTitle>
                      <CardDescription>Other vehicle-related documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span>{vehicle.id}_maintenance_history.pdf</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span>{vehicle.id}_warranty.pdf</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="notes">
                <div className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assignment Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter notes about vehicle assignments, special requirements, etc."
                            className="min-h-[200px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
