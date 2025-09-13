# Simple News CRUD Implementation

## Overview
This implementation provides a clean, simple news management system with the following features:

### Data Structure
- **Title**: String (required)
- **Description**: String (required) 
- **Image**: String URL (required, uploaded to Cloudinary)
- **Timestamps**: createdAt, updatedAt (automatic)

### API Endpoints

#### GET /api/news
- Fetches all news articles
- Returns array sorted by creation date (newest first)

#### POST /api/news
- Creates new news article
- Requires: title, description, image

#### GET /api/news/[id]
- Fetches single news article by ID

#### PUT /api/news/[id]
- Updates existing news article
- Requires: title, description, image

#### DELETE /api/news/[id]
- Deletes news article by ID

### Admin Interface (/admin/news)
- **Simple Form**: Title, Description, Image upload
- **News List**: Shows all articles with thumbnails and edit/delete actions
- **Smart Image Upload**: 
  - Shows preview of selected file before upload
  - Only uploads to Cloudinary when form is submitted
  - Prevents orphaned images in cloud storage
  - Proper cleanup of object URLs to prevent memory leaks
- **Real-time Updates**: Uses TanStack Query for automatic cache invalidation

### Frontend Integration
- **Home Page**: Shows latest 3 news articles
- **News Page**: Shows all news articles with loading states
- **Loading States**: Skeleton loading for better UX
- **Error Handling**: User-friendly error messages

### Key Features
1. **Simple Structure**: Only essential fields (title, description, image)
2. **Cloudinary Integration**: Secure image uploads with signature-based authentication
3. **Real-time Updates**: TanStack Query handles caching and synchronization
4. **Consistent HTTP Client**: Uses axios with proper error handling and interceptors
5. **Mobile Responsive**: Works on all screen sizes
6. **Loading States**: Smooth user experience with skeleton loading
7. **Error Handling**: Graceful error handling throughout

### Tech Stack
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Image Storage**: Cloudinary
- **Frontend**: React with TanStack Query
- **Styling**: Tailwind CSS

### File Structure
```
src/
├── models/
│   └── News.ts (Centralized Mongoose model)
├── types/
│   ├── models.ts (Database model interfaces)
│   └── news.ts (Re-exports News type)
├── app/
│   ├── api/news/
│   │   ├── route.ts (GET, POST - uses centralized model)
│   │   └── [id]/route.ts (GET, PUT, DELETE - uses centralized model)
│   └── [locale]/
│       ├── admin/news/page.tsx (Admin interface)
│       └── (news)/news/page.tsx (Public news page)
├── hooks/
│   └── useNews.ts (TanStack Query hooks)
└── components/
    └── home/News.tsx (Home page news section)
```

### Centralized Architecture
- **Models**: `src/models/News.ts` - Single source of truth for Mongoose schema
- **Types**: `src/types/models.ts` - TypeScript interfaces matching database models
- **API Routes**: Import and use the centralized model
- **Frontend**: Uses the centralized types through re-exports

### Usage
1. Navigate to `/admin/news` to manage articles
2. Fill in the simple form with title, description, and upload an image
3. Articles automatically appear on the home page and news page
4. Edit or delete articles using the action buttons in the admin interface

This implementation focuses on simplicity and core functionality, making it easy to understand and extend as needed.

## Code Quality
- **Clean Codebase**: Removed all redundant and unused code
- **No Console Logs**: Removed debug statements from production code
- **Consistent Error Handling**: Centralized error handling through axios interceptors
- **No Dead Code**: Eliminated unused components and files
- **Optimized Imports**: Removed unnecessary React imports and dependencies
