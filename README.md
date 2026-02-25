# BlogHub

A modern, full-featured blog and content management platform built with React, Redux Toolkit, and Appwrite. Create, manage, and share your articles with a beautiful, intuitive interface.

## 🌟 Features

- **User Authentication** - Secure user registration and login with email/password
- **Post Management** - Create, read, update, and delete blog posts
- **Rich Text Editor** - TinyMCE integration for advanced content formatting
- **Image Upload** - Upload and manage featured images for posts
- **Post Status Control** - Publish or draft posts with status management
- **User Authorization** - Only post authors can edit/delete their content
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **Real-time State Management** - Redux Toolkit for predictable state handling
- **Database Integration** - Appwrite backend for secure data storage

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM v7** - Client-side routing
- **Redux Toolkit** - State management
- **React Hook Form** - Form management and validation
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Modern build tool and dev server
- **TinyMCE React** - Rich text editor
- **HTML React Parser** - Parse HTML strings in React

### Backend & Services
- **Appwrite** - Backend-as-a-service platform
  - Authentication
  - Database (TablesDB)
  - File Storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- Git
- Appwrite account and self-hosted/cloud instance

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MegaProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables file**
   ```bash
   touch .env.local
   ```

4. **Configure environment variables**
   Add the following to `.env.local`:
   ```env
   VITE_APPWRITE_URL=https://your-appwrite-instance.com/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_TABLES_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── app/
│   └── store.js                 # Redux store configuration
├── appwrite/
│   ├── auth.js                  # Authentication service
│   ├── database.js              # Database operations
│   └── storage.js               # File storage operations
├── assets/                      # Static assets
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Container/
│   ├── post/
│   │   ├── PostCard.jsx
│   │   ├── PostForm.jsx
│   │   └── RTE.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Logo.jsx
│   │   └── Select.jsx
│   ├── AuthLayout.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── index.js
├── config/
│   └── config.js                # Appwrite configuration
├── features/
│   ├── auth/
│   │   └── authSlice.js         # Auth Redux slice
│   └── post/
│       └── postSlice.js         # Post Redux slice
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   ├── Post.jsx
│   └── AllPosts.jsx
├── App.jsx
├── main.jsx
├── index.css
└── App.css
```

## 🔐 Authentication

User authentication is handled through Appwrite's Account service. Users can:
- Register with email and password
- Login with credentials
- Logout and clear session
- Access protected routes based on authentication status

## 📝 Post Management

### Create Post
- Navigate to `/add-post` (requires authentication)
- Fill in title, content, featured image, and status
- Submit to create post in database

### Read Posts
- Homepage displays all active posts
- `/all-posts` shows all posts (requires authentication)
- Click post card to view full post

### Update Post
- Navigate to `/edit-post/:slug` (only for post author)
- Modify title, content, image, or status
- Save changes

### Delete Post
- Only post authors can delete
- Confirmation required before deletion
- Permanently removes post from database

## 🗄️ Redux State Management

### Auth Slice
- `status` - Boolean indicating if user is authenticated
- `userData` - Current logged-in user information

### Post Slice
- `posts` - Array of all posts
- `currentPost` - Currently viewed post
- `loading` - Loading state
- `error` - Error messages

## 🎨 UI Components

### Layout Components
- **Header** - Navigation bar with auth status
- **Footer** - Footer section
- **Container** - Centered content wrapper

### UI Components
- **Button** - Reusable button with variants
- **Input** - Form input with validation
- **Select** - Dropdown select component
- **Logo** - Application logo

### Post Components
- **PostCard** - Display post preview
- **PostForm** - Create/edit post form
- **RTE** - Rich text editor integration

## 🔄 Redux Slice Actions

### Auth Actions
- `login(userData)` - Set authentication status
- `logout()` - Clear authentication

### Post Actions
- `setPosts(posts)` - Update posts array
- `setCurrentPost(post)` - Set current post
- `addPost(post)` - Add new post
- `updatePost(post)` - Update existing post
- `deletePost(slug)` - Remove post
- `setLoading(boolean)` - Set loading state
- `setError(error)` - Set error state

## 🌐 Environment Setup

### Appwrite Configuration
1. Create an Appwrite project
2. Set up Authentication with Email/Password
3. Create a Database with a Posts collection
4. Create a Storage bucket for images
5. Copy credentials to `.env.local`

### Database Schema
Posts should have the following fields:
- `title` (Text) - Post title
- `slug` (Text) - URL-friendly identifier
- `content` (Text) - Post content (HTML)
- `featuredImage` (Text) - Image file ID
- `status` (Text) - "active" or "inactive"
- `userId` (Text) - Author user ID
- `$id` (Auto) - Document ID
- `$createdAt` (Auto) - Creation timestamp
- `$updatedAt` (Auto) - Last update timestamp

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Dependencies

### Production Dependencies
- @reduxjs/toolkit: ^2.11.2
- @tailwindcss/vite: ^4.1.18
- @tinymce/tinymce-react: ^6.3.0
- appwrite: ^22.3.0
- react: ^19.2.0
- react-dom: ^19.2.0
- react-hook-form: ^7.71.2
- react-redux: ^9.2.0
- react-router-dom: ^7.13.1
- tailwindcss: ^4.1.18

### Development Dependencies
- Vite: ^8.0.0-beta.13
- ESLint with React plugins
- TypeScript types for React

## 🔒 Security Considerations

- Store Appwrite credentials in environment variables
- Never commit `.env.local` to version control
- Validate user input on both client and server
- Use HTTPS in production
- Implement proper authentication checks
- Validate file uploads for malicious content

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For support, email ankush.mondal@example.com or open an issue on GitHub.

## 🎯 Future Enhancements

- [ ] Comment system on posts
- [ ] User profiles and following
- [ ] Search functionality
- [ ] Tags and categories
- [ ] Post scheduling
- [ ] Analytics dashboard
- [ ] Social sharing
- [ ] Newsletter subscription

## 🙏 Acknowledgments

- [React](https://react.dev) - UI library
- [Appwrite](https://appwrite.io) - Backend services
- [Redux Toolkit](https://redux-toolkit.js.org) - State management
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Vite](https://vitejs.dev) - Build tool

---

**Happy Blogging! 🚀**
