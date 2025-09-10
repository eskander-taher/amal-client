# Cloudinary Upload Flow Implementation

This implementation provides a complete, reusable Cloudinary upload flow for handling form submissions with media files using direct client-to-Cloudinary signed uploads.

## Features

- ✅ Direct client-to-Cloudinary uploads (no server storage)
- ✅ Signed upload security
- ✅ TypeScript fully typed
- ✅ Reusable React hooks and components
- ✅ Progress tracking and error handling
- ✅ File validation (size, type, dimensions)
- ✅ MongoDB integration for storing media records
- ✅ Drag & drop support
- ✅ Multiple file upload support

## Architecture

```
Client → API (/api/media/signature) → Cloudinary Upload → API (/api/news) → MongoDB
```

1. **Client requests signature** from `/api/media/signature`
2. **Client uploads directly** to Cloudinary using signed parameters
3. **Client receives** `secure_url` and `public_id`
4. **Client submits form** with media URLs to your API route
5. **API saves** complete record to MongoDB

## Environment Variables

Add these to your `.env.local` file:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/your-database-name

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Files Created

### 1. Types (`src/types/cloudinary.ts`)
- `CloudinarySignatureResponse` - API signature response
- `CloudinaryUploadResponse` - Cloudinary upload response
- `CloudinaryUploadParams` - Upload parameters
- `UseCloudinaryUploadResult` - Hook return type
- `MediaRecord` - Database media record
- `FormWithMediaData` - Form data with media

### 2. API Route (`src/app/api/media/signature/route.ts`)
- Generates signed upload parameters
- Validates environment variables
- Supports optional parameters (folder, tags, transformations)

### 3. Utility Functions (`src/lib/cloudinary.ts`)
- `getCloudinarySignature()` - Request signature from API
- `uploadToCloudinary()` - Upload file with progress tracking
- `validateFile()` - File validation (size, type, dimensions)
- `getCloudinaryUrl()` - Generate transformation URLs

### 4. React Hooks (`src/hooks/useCloudinaryUpload.ts`)
- `useCloudinaryUpload()` - Single file upload hook
- `useCloudinaryMultiUpload()` - Multiple file upload hook
- Built-in validation, progress tracking, error handling

### 5. Components
- `MediaUploader` (`src/components/MediaUploader.tsx`) - Reusable upload component
- `MediaPreview` - Media preview component
- `CloudinaryUploadForm` (`src/components/CloudinaryUploadForm.tsx`) - Complete form example

### 6. Example API Route (`src/app/api/news/route.ts`)
- Demonstrates saving media records to MongoDB
- Includes Mongoose schema for media
- Handles form submission with media

### 7. Example Page (`src/app/[locale]/example-usage/page.tsx`)
- Complete working example
- Demonstrates the full flow

## Usage Examples

### Basic Upload Hook

```tsx
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';

function MyComponent() {
  const { upload, isUploading, error, progress } = useCloudinaryUpload({
    onSuccess: (result) => {
      console.log('Upload successful:', result.secure_url);
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    },
  });

  const handleFileSelect = async (file: File) => {
    try {
      const result = await upload({
        file,
        folder: 'my-uploads',
        tags: ['user-content'],
      });
      // result contains secure_url, public_id, etc.
    } catch (err) {
      // Error handling
    }
  };
}
```

### Reusable Upload Component

```tsx
import MediaUploader, { MediaPreview } from '@/components/MediaUploader';

function MyForm() {
  const [media, setMedia] = useState<MediaRecord[]>([]);

  return (
    <div>
      <MediaUploader
        onUploadComplete={(mediaRecord) => {
          setMedia(prev => [...prev, mediaRecord]);
        }}
        folder="my-folder"
        tags={['tag1', 'tag2']}
      />
      
      <MediaPreview 
        media={media} 
        onRemove={(index) => {
          setMedia(prev => prev.filter((_, i) => i !== index));
        }} 
      />
    </div>
  );
}
```

### Form Submission with Media

```tsx
const handleSubmit = async (formData: any, media: MediaRecord[]) => {
  const response = await fetch('/api/news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      media, // Array of MediaRecord objects
    }),
  });
};
```

## Validation Options

```tsx
const { upload } = useCloudinaryUpload({
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png'],
  maxDimensions: { width: 2000, height: 2000 },
});
```

## Security Features

- **Signed Uploads**: All uploads use server-generated signatures
- **File Validation**: Size, type, and dimension validation
- **Environment Variables**: Sensitive keys stored securely
- **Error Handling**: Comprehensive error handling and user feedback

## Testing

Visit `/example-usage` in your application to test the complete flow:

1. Fill out the form
2. Upload media files
3. Submit the form
4. Check MongoDB for the saved record

## Customization

### Custom Transformations

```tsx
await upload({
  file,
  transformation: 'w_500,h_500,c_fill',
  eager: 'w_200,h_200,c_thumb',
});
```

### Custom Validation

```tsx
const validation = await validateFile(file, {
  maxSizeBytes: 2 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png'],
  maxDimensions: { width: 1920, height: 1080 },
});
```

### Custom Upload Parameters

```tsx
const signature = await getCloudinarySignature({
  folder: 'user-uploads',
  tags: ['user-content', 'profile'],
  eager: 'w_300,h_300,c_fill',
});
```

## Error Handling

The implementation includes comprehensive error handling:

- File validation errors
- Network errors during upload
- Cloudinary API errors
- MongoDB save errors
- User-friendly error messages

## Performance Considerations

- Direct client-to-Cloudinary uploads (no server bottleneck)
- Progress tracking for better UX
- File validation before upload
- Optimized for large files
- Concurrent upload support

## Multiple Images Handling

### 🎯 **Your System Already Supports Multiple Images Per Record!**

The database schema stores media as an **array**:
```typescript
media: [{
  public_id: String,
  secure_url: String,
  original_filename: String,
  format: String,
  resource_type: 'image' | 'video' | 'raw' | 'auto',
  width: Number,
  height: Number,
  bytes: Number,
  folder: String,
  tags: [String],
  created_at: Date
}]
```

### 🚀 **Enhanced Components for Multiple Images**

#### 1. **MultipleImageUploader** (`src/components/MultipleImageUploader.tsx`)
- Bulk upload multiple files at once
- Drag & drop multiple files
- Progress tracking for each file
- File validation and preview
- Maximum file limits (configurable)

```tsx
<MultipleImageUploader
  onUploadComplete={(media) => setUploadedMedia(prev => [...prev, ...media])}
  maxFiles={10}
  existingMedia={currentMedia}
  folder="news-articles"
  tags={['news', 'article']}
/>
```

#### 2. **ImageGallery** (`src/components/ImageGallery.tsx`)
- Display multiple images with navigation
- Thumbnail navigation
- Full-size image viewer
- Image counter and details
- Responsive design

```tsx
<ImageGallery 
  media={article.media} 
  showThumbnails={true}
  maxHeight="500px"
/>
```

#### 3. **ImageGalleryCompact** (for cards/lists)
- Shows first image with "+X more" indicator
- Perfect for article cards and lists
- Minimal space usage

```tsx
<ImageGalleryCompact media={article.media} />
```

#### 4. **NewsDetailView** (`src/components/NewsDetailView.tsx`)
- Complete article view with image gallery
- Separate sections for images and videos
- Media details and metadata
- Tags and article information

### 📱 **Multiple Images in Practice**

#### **Upload Flow:**
1. User selects/drops multiple files
2. Files are validated individually
3. Progress tracked for each file
4. All files uploaded to Cloudinary
5. URLs stored in database as array

#### **Display Flow:**
1. Fetch article with media array
2. Filter images vs videos
3. Show gallery for multiple images
4. Show individual previews for single images

#### **Database Storage:**
```javascript
// Example article with multiple images
{
  title: "My Article",
  description: "Article description",
  media: [
    {
      public_id: "news-articles/image1",
      secure_url: "https://res.cloudinary.com/.../image1.jpg",
      resource_type: "image",
      width: 1920,
      height: 1080
    },
    {
      public_id: "news-articles/image2", 
      secure_url: "https://res.cloudinary.com/.../image2.jpg",
      resource_type: "image",
      width: 1280,
      height: 720
    },
    {
      public_id: "news-articles/video1",
      secure_url: "https://res.cloudinary.com/.../video1.mp4",
      resource_type: "video"
    }
  ]
}
```

### 🎨 **UI Features for Multiple Images**

- **Gallery Navigation**: Arrow buttons and thumbnail navigation
- **Image Counter**: "2 / 5" display
- **Multiple Indicators**: "+3 more" badges on cards
- **Bulk Actions**: Upload multiple, clear all, remove individual
- **Progress Tracking**: Individual progress bars per file
- **File Limits**: Configurable maximum files per record
- **Mixed Media**: Support images and videos in same record

### 💡 **Best Practices for Multiple Images**

1. **Limit File Count**: Set reasonable limits (e.g., 10 images max)
2. **Optimize Images**: Use Cloudinary transformations for different sizes
3. **Lazy Loading**: Load images as needed in galleries
4. **Thumbnails**: Generate thumbnails for navigation
5. **User Feedback**: Show progress and file counts
6. **Validation**: Check file types and sizes before upload

## Toast Notifications Integration

### 🎯 **React-Toastify + TanStack Query = Perfect UX**

Your system now includes comprehensive toast notifications integrated with TanStack Query hooks for excellent user feedback.

#### **Benefits:**
- ✅ **Automatic Success/Error Feedback** - All operations show toast notifications
- ✅ **Consistent UX** - Same toast styling across all operations
- ✅ **Progress Tracking** - Upload progress with loading toasts
- ✅ **Non-blocking** - Toasts don't interrupt user workflow
- ✅ **Customizable** - Different durations and styles per operation

#### **Integration Points:**

1. **News Operations** (`src/hooks/useNews.ts`):
```typescript
const createNews = useCreateNews(); // Shows success/error toasts automatically
const updateNews = useUpdateNews(); // Shows update confirmation
const deleteNews = useDeleteNews(); // Shows deletion confirmation
```

2. **Cloudinary Uploads** (`src/hooks/useCloudinaryQuery.ts`):
```typescript
const upload = useCloudinaryUploadWithSignature(); // Shows upload progress and completion
```

3. **Custom Toast Utilities** (`src/lib/toast.ts`):
```typescript
import { showToast, toastPromise, toastMessages } from '@/lib/toast';

// Manual toasts
showToast.success('Operation completed!');
showToast.error('Something went wrong');

// Promise-based toasts with loading states
await toastPromise(
  apiCall(),
  {
    loading: 'Processing...',
    success: 'Done!',
    error: 'Failed!'
  }
);
```

#### **Toast Messages:**
- 📰 **News**: "Article 'Title' created successfully!"
- 📤 **Upload**: "'filename.jpg' uploaded successfully!"
- ❌ **Errors**: "Failed to create article: validation error"
- 🗑️ **Delete**: "Article 'Title' deleted successfully!"

#### **Configuration:**
React-toastify is already configured in `src/components/Providers.tsx` with:
- Position: top-right
- Auto-close: 3-5 seconds (longer for errors)
- Progress bar, drag to dismiss, pause on hover
- Custom styling for different message types

#### **Example Usage:**
```typescript
function MyComponent() {
  const createNews = useCreateNews(); // Auto-toast on success/error
  
  const handleSubmit = async (data) => {
    try {
      await createNews.mutateAsync(data); // Success toast shows automatically
    } catch (error) {
      // Error toast shows automatically
    }
  };
}
```

## Browser Compatibility

- Modern browsers with File API support
- Drag & drop functionality
- XMLHttpRequest for progress tracking
- FormData for multipart uploads
