"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

interface AddVehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleType: "truck" | "trailer"
}

export function AddVehicleDialog({ open, onOpenChange, vehicleType }: AddVehicleDialogProps) {
  const formSchema = vehicleType === "truck" ? truckFormSchema : trailerFormSchema

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      model: "",
      vin: "",
      licensePlate: "",
      status: "Available",
      ...(vehicleType === "truck" && { odometer: 0 }),
      nextServiceDue: "",
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Log the values for debugging
    console.log(values)

    // Close the dialog
    onOpenChange(false)

    // Reset the form with a slight delay to avoid state update conflicts
    setTimeout(() => {
      form.reset()
    }, 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New {vehicleType === "truck" ? "Truck" : "Trailer"}</DialogTitle>
          <DialogDescription>
            Enter the details for the new {vehicleType === "truck" ? "truck" : "trailer"}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder={vehicleType === "truck" ? "T-XXX" : "TR-XXX"} {...field} />
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
                      <Input placeholder="Enter model" {...field} />
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
                      <Input placeholder="17-character VIN" {...field} />
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
                      <Input placeholder="Enter license plate" {...field} />
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
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any additional notes or comments" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add {vehicleType === "truck" ? "Truck" : "Trailer"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
