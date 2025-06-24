import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { AlertTriangle, Trash2 } from "lucide-react";
import type { Product } from "@shared/schema";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  product,
}: DeleteConfirmationModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", `/api/products/${product?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products/stats"] });
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (product) {
      deleteMutation.mutate();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription className="mt-2">
                Are you sure you want to delete "{product?.name}"? This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
