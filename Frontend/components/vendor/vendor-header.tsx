'use client';

import { Button } from '@/components/ui/button';
import { Upload, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BulkUploadForm } from '@/components/vendor/bulk-upload-form';

export function VendorHeader() {
  return (
    <div className="border-b bg-white">
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage your products and track your sales
            </p>
          </div>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Bulk Upload Products</DialogTitle>
                  <DialogDescription>
                    Upload multiple products at once using our template
                  </DialogDescription>
                </DialogHeader>
                <BulkUploadForm />
              </DialogContent>
            </Dialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
