import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Service from '../appwrite/config'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom'
import Container from '../components/container/Container'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import {X} from 'lucide-react'


function PostPage() {
    const [posts, setPosts] = useState(null);
    const [imageUrl, setImageUrl] = useState('')
    const [showImagePreview, setShowImagePreview] = useState(false);

    const userData = useSelector((state) => state.auth.userData)
    const { slug } = useParams()
    const isAuthor = posts && userData ? posts.userId === userData.$id : false
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            Service.getPost(slug)
                .then((post) => {
                    if (post) setPosts(post)
                    else navigate('/')
                })
                .catch(() => navigate('/'))
        }
    }, [slug, navigate])
    useEffect(() => {
        async function fetchImageUrl() {
            if (posts && posts.featuredImage) {
                const url = await Service.getFileview(posts.featuredImage);
                setImageUrl(url);
            }
        }
        fetchImageUrl();
    }, [posts]);

    const deletePost = () => {
        if (posts.featuredImage) {
            Service.deleteFile(posts.featuredImage)
                .then(() => {
                    Service.deletePost(posts.$id)  // 👈 This now works
                        .then(() => navigate('/'))
                        .catch((error) => console.error("Failed to delete post:", error));
                })
                .catch((error) => console.error("Failed to delete file:", error));
        } else {
            Service.deletePost(posts.$id)
                .then(() => navigate('/'))
                .catch((error) => console.error("Failed to delete post:", error));
        }
    };

    return posts ? (
        <Container>
            <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md">
                {/* Featured Image */}
                {imageUrl && (
                    <div className="relative w-full mb-6 rounded-md overflow-hidden">
                        <button onClick={() => setShowImagePreview(true)}>
                            <img
                                src={imageUrl}
                                alt={posts.title}
                                className="w-full max-h-[400px] object-cover rounded-md hover:brightness-90 transition-all"
                            />
                        </button>

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${posts.$id}`}>
                                    <Button bgColor="bg-green-500" className="text-sm px-3 py-1">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    className="text-sm px-3 py-1"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{posts.title}</h1>

                {/* Post Content */}
                <div className="prose prose-lg max-w-none text-gray-700">
                    {parse(posts.content)}
                </div>
            </div>
            {showImagePreview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
                    onClick={() => setShowImagePreview(false)}
                >
                    <div
                        className="relative w-full max-w-5xl mx-auto p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <img
                            src={imageUrl}
                            alt="Full Preview"
                            className="rounded-xl mx-auto w-full max-h-[90vh] object-contain shadow-2xl border border-white/10"
                        />

                        {/* Lucide Close Icon */}
                        <button
                            onClick={() => setShowImagePreview(false)}
                            className="absolute top-4 right-4 bg-white/90 text-black p-2 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            title="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}


        </Container>

    ) : null;


}

export default PostPage