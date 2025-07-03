import React, { useEffect, useState } from 'react';
import Service from '../appwrite/config';
import PostCard from '../components/PostCard';
import PageWrapper from '../components/container/Pagewrapper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Features/postSlice';

function AllPostPage() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts())
    }
  }, [dispatch, posts.length]);

  return (

    <div className="min-h-screen w-full bg-gray-50">
      {!loading ? (<PageWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {posts && posts.length > 0 ? (
            posts.map((p) => <PostCard key={p.$id} {...p} />)
          ) : (
            <div className='w-full'>
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <p className="text-center text-gray-500 text-lg">No posts found. Please login to view your feed.</p>
                <a
                  href="/login"
                  className="px-5 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md"
                >
                  Login
                </a>
              </div>
            </div>


          )}
        </div>
      </PageWrapper>) : (<p>Loading...</p>)}

    </div>
  );
}

export default AllPostPage;
