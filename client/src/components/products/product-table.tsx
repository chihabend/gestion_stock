import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Box, Smartphone, Laptop } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductTableProps {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ onEdit, onDelete }: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created_at");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products', { search: searchQuery, sortBy }],
  });

  const getStockBadgeVariant = (quantity: number) => {
    if (quantity > 10) return "default";
    if (quantity > 5) return "secondary";
    return "destructive";
  };

  const getProductIcon = (name: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('headphone') || lowercaseName.includes('audio')) {
      return <Box className="text-gray-500" />;
    }
    if (lowercaseName.includes('phone') || lowercaseName.includes('case')) {
      return <Smartphone className="text-gray-500" />;
    }
    if (lowercaseName.includes('laptop') || lowercaseName.includes('stand')) {
      return <Laptop className="text-gray-500" />;
    }
    return <Box className="text-gray-500" />;
  };

  return (
    <div className="bg-surface shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Products Inventory</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your product stock levels and information.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="quantity">Sort by Quantity</SelectItem>
                <SelectItem value="created_at">Sort by Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="ml-4">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 bg-gray-200 rounded"></div>
                      <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <Box className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No products found</p>
                    <p className="text-gray-400 text-sm">
                      {searchQuery ? "Try adjusting your search query" : "Add your first product to get started"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {getProductIcon(product.name)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: #{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStockBadgeVariant(product.quantity)}>
                      {product.quantity} units
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {product.description || "No description provided"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(product.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="text-primary hover:text-blue-700 mr-3"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product)}
                      className="text-destructive hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{products.length}</span> of{" "}
              <span className="font-medium">{products.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <Button
                variant="outline"
                size="sm"
                className="rounded-l-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white border-primary">
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-r-md"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
