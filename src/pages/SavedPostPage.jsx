import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedPosts, deleteSavedPost } from '../Features/savedSlice';
import Service from '../appwrite/config';
import PostCard from '../components/PostCard';
import PageWrapper from '../components/container/Pagewrapper';
import Button from '../components/Button';
import { BookmarkX } from 'lucide-react';

function SavedPostsPage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { saved } = useSelector((state) => state.saved);
  const [fullPosts, setFullPosts] = useState([]);

  useEffect(() => {
    if (userData?.$id) {
      dispatch(fetchSavedPosts(userData.$id));
    }
  }, [userData, dispatch]);

  useEffect(() => {
  const cachedPostMap = new Map(fullPosts.map(post => [post.$id, post]));

  async function fetchPosts() {
    const posts = await Promise.all(
      saved.map(async (item) => {
        // Use cache if available
        const cached = cachedPostMap.get(item.postId);
        if (cached) {
          return { ...cached, savedId: item.$id };
        }

        // Otherwise, fetch fresh
        try {
          const fullPost = await Service.getPost(item.postId);
          return { ...fullPost, savedId: item.$id };
        } catch (err) {
          console.error('Error fetching saved post:', err);
          return null;
        }
      })
    );

    setFullPosts(posts.filter(Boolean));
  }

  if (saved.length > 0) {
    fetchPosts();
  } else {
    setFullPosts([]);
  }
}, [saved]);

const handleUnsave = (savedId) => {
  setFullPosts((prev) => prev.filter((post) => post.savedId !== savedId));
  dispatch(deleteSavedPost(savedId));
};

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
          Saved Posts
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage posts you’ve saved.
        </p>
      </div>

      {fullPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fullPosts.map((post) => (
            <div
              key={post.$id}
              className="relative group transition-transform hover:-translate-y-1"
            >
              <PostCard {...post} />
              <Button
                onClick={() => handleUnsave(post.savedId)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-red-500 border border-red-200 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                title="Unsave"
              >
                <BookmarkX size={16} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-16">
          <BookmarkX size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg font-medium">
            No saved posts yet.
          </p>
          <p className="text-gray-400 text-sm">
            Start exploring and save the posts you love!
          </p>
        </div>
      )}
    </PageWrapper>
  );
}

export default SavedPostsPage;
