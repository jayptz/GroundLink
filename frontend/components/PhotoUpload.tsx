'use client';

import { useState } from 'react';
import { post, uploadFile } from '@/lib/api';

interface PresignResponse {
  url: string;
}

interface PhotoUploadProps {
  jobId: string | number;
}

export default function PhotoUpload({ jobId }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Get presigned URL
      const presignResponse = await post<PresignResponse>('/photos/presign', { jobId }, undefined);
      
      // Upload to S3
      await uploadFile(presignResponse.url, file);
      
      // Complete upload
      await post('/photos/complete', {
        jobId,
        filename: file.name,
        contentType: file.type,
        size: file.size,
      }, undefined);

      // Reset form
      event.target.value = '';
      
    } catch (error) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700">
          Upload Photo
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50"
        />
      </div>
      
      {uploading && (
        <div className="text-blue-600 text-sm">
          Uploading...
        </div>
      )}
      
      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 