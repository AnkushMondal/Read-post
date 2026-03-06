import React from 'react'
import { Link } from 'react-router-dom'
import databaseService from '../../appwrite/database'
import storageService from '../../appwrite/storage'

const PostCard = ({$id, title, featuredImage}) => {
  const previewUrl = storageService.getFilePreview(featuredImage);

  return (
     <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200 overflow-hidden'>
            <div className='w-full mb-4'>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={title}
                  className='rounded-xl w-full h-auto object-cover'
                />
              ) : (
                <div className='h-48 w-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-gray-500'>No image</span>
                </div>
              )}
            </div>
            <h2
            className='text-lg sm:text-xl font-semibold text-gray-800'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
