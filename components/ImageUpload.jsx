'use client';
import { api } from '@/lib/api';
import { Image as ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageUpload({ value, onChange, multiple = false }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    if (multiple) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
    } else {
      formData.append('image', files[0]);
    }

    try {
      const endpoint = multiple ? '/api/upload/multiple' : '/api/upload';
      const data = await api.upload(endpoint, formData);
      
      if (multiple) {
        onChange([...(value || []), ...data.urls]);
      } else {
        onChange(data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (urlToRemove) => {
    if (multiple) {
      onChange(value.filter((url) => url !== urlToRemove));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {multiple && Array.isArray(value) ? (
          value.map((url, index) => (
            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
              <Image src={url} alt={`Upload ${index}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))
        ) : (
          value && (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-white/10">
              <Image src={value} alt="Upload" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(value)}
                className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )
        )}

        {!value || (multiple && value.length < 5) ? (
          <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-accent/40 hover:bg-white/5 transition-all">
            {uploading ? (
              <Loader2 className="animate-spin text-accent" size={24} />
            ) : (
              <>
                <ImageIcon size={24} className="text-white/40 mb-2" />
                <span className="text-xs text-white/40">Upload Image</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept="image/*"
              multiple={multiple}
              disabled={uploading}
            />
          </label>
        ) : null}
      </div>
    </div>
  );
}
