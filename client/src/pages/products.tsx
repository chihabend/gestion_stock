import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import ProductStats from "@/components/products/product-stats";
import ProductTable from "@/components/products/product-table";
import ProductFormModal from "@/components/products/product-form-modal";
import DeleteConfirmationModal from "@/components/products/delete-confirmation-modal";
import { Button } from "@/components/ui/button";
import { Plus, Menu, User } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-surface shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="ml-3 text-2xl font-semibold text-gray-900">Gestion des Produits</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter Produit
                </Button>
                <div className="flex items-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <ProductStats />
            <ProductTable onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </main>
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mode="add"
      />
      
      <ProductFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProduct(null);
        }}
        mode="edit"
        product={editingProduct}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingProduct(null);
        }}
        product={deletingProduct}
      />
    </div>
  );
}
