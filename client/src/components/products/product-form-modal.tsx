import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertProductSchema, type Product, type InsertProduct } from "@shared/schema";
import { Plus, Save } from "lucide-react";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  product?: Product | null;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  mode,
  product,
}: ProductFormModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && product) {
      form.reset({
        name: product.name,
        quantity: product.quantity,
        description: product.description || "",
      });
    } else if (mode === "add") {
      form.reset({
        name: "",
        quantity: 0,
        description: "",
      });
    }
  }, [mode, product, form]);

  const createMutation = useMutation({
    mutationFn: (data: InsertProduct) => apiRequest("POST", "/api/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products/stats"] });
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
      onClose();
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: InsertProduct) => 
      apiRequest("PUT", `/api/products/${product?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products/stats"] });
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertProduct) => {
    if (mode === "add") {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter product name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      placeholder="Enter quantity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Brief description of the product"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-primary hover:bg-blue-700"
              >
                {mode === "add" ? (
                  <Plus className="h-4 w-4 mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {mode === "add" ? "Add Product" : "Update Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
