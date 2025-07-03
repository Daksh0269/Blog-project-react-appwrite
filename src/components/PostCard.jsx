import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Service from '../appwrite/config';
import { addSavedPost, deleteSavedPost } from '../Features/savedSlice';
import { Bookmark, BookmarkCheck } from 'lucide-react';

function PostCard({ $id, title, featuredImage }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const saved = useSelector((state) => state.saved.saved);

  const isSaved = saved.some(item => item.postId === $id);

  const toggleSave = (e) => {
    e.stopPropagation(); // prevent navigating when clicking bookmark
    e.preventDefault();
    const savedDoc = saved.find(item => item.postId === $id);
    if (savedDoc) {
      dispatch(deleteSavedPost(savedDoc.$id));
    } else {
      dispatch(addSavedPost({ userId: userData.$id, postId: $id }));
    }
  };

  useEffect(() => {
    async function fetchPreview() {
      if (featuredImage) {
        const url = await Service.getFileview(featuredImage);
        setPreviewUrl(url);
      }
    }
    fetchPreview();
  }, [featuredImage]);

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative group overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Background Ripple on Hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(147,197,253,0.15),transparent)]" />

      {/* Card Content */}
      <Link to={`/post/${$id}`} className="relative z-10 block">
        {/* Image */}
        <div className="w-full aspect-[3/2] overflow-hidden rounded-t-lg">
          {previewUrl && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={previewUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Title */}
          <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
            {title}
          </h2>

          {/* Read More */}
          <motion.div
            className="inline-block relative text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            initial="rest"
            whileHover="hover"
          >
            Read More
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
              variants={{
                rest: { width: '0%' },
                hover: { width: '100%' },
              }}
            />
          </motion.div>
        </div>
      </Link>

      {/* Save / Unsave Button */}
      <button
        onClick={toggleSave}
        className="absolute top-3 right-3 z-20 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow transition"
        title={isSaved ? 'Unsave Post' : 'Save Post'}
      >
        {isSaved ? <BookmarkCheck size={18} className="text-blue-600" /> : <Bookmark size={18} className="text-gray-600" />}
      </button>
    </motion.div>
  );
}

export default PostCard;
