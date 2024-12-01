"use client"

import { Plus, Upload, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Upload className="w-4 h-4 mr-2" />
          Import Products
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}