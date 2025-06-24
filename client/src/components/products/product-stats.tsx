import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Box, AlertTriangle, TrendingUp } from "lucide-react";

export default function ProductStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/products/stats'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="ml-5 flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="overflow-hidden shadow">
        <CardContent className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Box className="text-primary text-2xl" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Produits</dt>
                <dd className="text-lg font-medium text-gray-900">{stats?.totalProducts || 0}</dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow">
        <CardContent className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="text-warning text-2xl" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Stock Faible</dt>
                <dd className="text-lg font-medium text-gray-900">{stats?.lowStockCount || 0}</dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow">
        <CardContent className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="text-success text-2xl" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Valeur Totale</dt>
                <dd className="text-lg font-medium text-gray-900">
                  ${stats?.totalValue?.toLocaleString() || 0}
                </dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
