import { Box, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Box className="text-primary text-2xl mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">Brisk Stock</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              <a
                href="#"
                className="bg-primary text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Box className="mr-3 h-5 w-5 text-white" />
                Products
              </a>
              <a
                href="#"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <BarChart3 className="mr-3 h-5 w-5 text-gray-400" />
                Analytics
              </a>
              <a
                href="#"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Settings className="mr-3 h-5 w-5 text-gray-400" />
                Settings
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
