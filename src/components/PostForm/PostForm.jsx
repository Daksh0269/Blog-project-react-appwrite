import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import RTE from '../RTE'
import { useSelector } from 'react-redux'
import Service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import SelectComponent from '../SelectComponent'
import { useEffect } from 'react'
import Button from '../Button'


function PostForm({ post }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchPreview() {
      if (post && post.featuredImage) {
        const url = await Service.getFileview(post.featuredImage)
        setImageUrl(url)
      }
    }
    fetchPreview()
  }, [post])

  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title,
      slug: post?.slug,
      content: post?.content,
      status: post?.status || 'public',
    }
  })
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  // Don't render the form until userData is loaded
  if (!userData) {
    return <div>Loading user data...</div>
  }
  const submit = async (data) => {
    //     if (!userData?.$id) {
    //     alert("User not loaded. Please wait.");
    //     return;
    // }
    console.log("userData:", userData); // Add this line
    if (post) {
      const file = data.image[0] ? await Service.uploadFile(data.image[0]) : null;
      if (file) {
        Service.deleteFile(post.featuredImage[0])
      }
      const dbpost = await Service.updateDocument(
        post.$id,
        {
          ...data,
          featuredImage: file ? file.$id : undefined,
        })
      if (dbpost) {

        setSuccess("Post updated successfully!");
        setTimeout(() => navigate(`/all-posts`), 1000); // delay redirect
      }
    } else {
      const file = await Service.uploadFile(data.image[0])
      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbpost = await Service.createPost({
          ...data,
          userId: userData.$id
        })
        if (dbpost) {

          setSuccess("Post created successfully!");
          setTimeout(() => navigate(`/all-posts`), 1000); // delay redirect
        }
      }
    }


  }
  const slugTransform = useCallback((value) => {
    if (value && typeof (value) === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return ""

  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue])
  return (
    <>
      {success && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-green-100 text-green-800 border border-green-300 text-sm">
          {success}
        </div>
      )}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col lg:flex-row gap-6"
      >
        {/* Left Side */}
        <div className="flex-1 space-y-4">
          <Input
            label="Title"
            placeholder="Enter post title"
            {...register('title', { required: true })}
          />

          <Input
            label="Slug"
            placeholder="Auto-generated or edit manually"
            {...register('slug', { required: true })}
            onInput={(e) =>
              setValue('slug', slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />

          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues('content')}
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[300px] space-y-4">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('image', { required: !post })}
          />

          {post && imageUrl && (
            <div className="w-full rounded overflow-hidden">
              <img
                src={imageUrl}
                alt={post.title}
                className="rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
              />
            </div>
          )}

          <SelectComponent
            label="Status"
            options={['public', 'private']}
            {...register('status', { required: true })}
          />

          <Button
            type="submit"
            bgColor={post ? 'bg-green-600' : 'bg-green-600'}
            className="w-full"
          >
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>

    </>

  )

}

export default PostForm