'use client';

import { useMutation } from '@tanstack/react-query';
import { UploadCloud } from 'lucide-react';
import { useRef } from 'react';

import { api } from '@/lib/api/client';

import { Button } from '../ui/button';

export function ImageUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data as { url: string };
    },
    onSuccess: (data) => onUploaded(data.url),
  });

  const openPicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) uploadMutation.mutate(file);
        }}
      />
      <Button type="button" variant="outline" onClick={openPicker}>
        <UploadCloud className="mr-2 h-4 w-4" />
        {uploadMutation.isPending ? 'Uploading...' : 'Upload Image'}
      </Button>
      {uploadMutation.isError ? <p className="text-xs text-rose-300">Upload failed</p> : null}
    </div>
  );
}
