import { useState } from 'react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { showToast } from '@/lib/toast';

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, folder = 'uploads'): Promise<string> => {
    setUploading(true);
    
    try {
      const imageUrl = await uploadToCloudinary(file, folder);
      showToast.success('✅ Image uploaded successfully!');
      return imageUrl;
    } catch (error) {
      showToast.error('❌ Failed to upload image');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
}
