'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload } from 'lucide-react';

export function BulkUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploading(false);
    setFile(null);
  };

  const downloadTemplate = () => {
    // In a real app, this would download a CSV template
    console.log('Downloading template...');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert>
        <AlertDescription>
          Download our template file first, fill it with your product data, and
          upload it back. Make sure all required fields are filled correctly.
        </AlertDescription>
      </Alert>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={downloadTemplate}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Template
      </Button>

      <div className="space-y-2">
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div className="text-sm">
          Selected file: <span className="font-medium">{file.name}</span>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!file || uploading}>
        {uploading ? (
          'Uploading...'
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Products
          </>
        )}
      </Button>
    </form>
  );
}
