import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '../components/container/container'
import Service from '../appwrite/config'
import PostForm from '../components/PostForm/PostForm'

function EditPostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            Service.getPost(slug)
                .then((post) => {
                    if (post) setPost(post)
                    else setPost(null)
                })
                .catch((err) => {
                    console.log("error", err);
                    setPost(null);
                });
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPostPage