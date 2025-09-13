import axios from 'axios';

// Simple Cloudinary upload function
export async function uploadToCloudinary(file: File, folder = 'uploads'): Promise<string> {
  // Get signature from our API
  const signatureResponse = await axios.post('/api/media/signature', {
    folder,
    tags: ['upload'],
  });

  const signatureData = signatureResponse.data;

  // Upload to Cloudinary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signatureData.api_key);
  formData.append('timestamp', signatureData.timestamp);
  formData.append('signature', signatureData.signature);
  formData.append('folder', folder);
  formData.append('tags', 'upload');

  const uploadResponse = await axios.post(
    `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
    formData
  );

  return uploadResponse.data.secure_url;
}
