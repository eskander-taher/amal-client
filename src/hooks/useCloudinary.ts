import { useState } from 'react';
import { uploadToCloudinary } from "@/lib/cloudinary";

export function useCloudinaryUpload() {
	const [uploading, setUploading] = useState(false);

	const upload = async (file: File, folder = "uploads"): Promise<string> => {
		setUploading(true);
		try {
			const imageUrl = await uploadToCloudinary(file, folder);
			return imageUrl;
		} catch (error) {
			throw error;
		} finally {
			setUploading(false);
		}
	};

	return { upload, uploading };
}

