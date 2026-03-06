import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPost, updatePost } from "../../features/post/postSlice";
import databaseService from "../../appwrite/database";
import storageService from "../../appwrite/storage";

export default function PostForm({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "draft",
      category: post?.category || "",
    },
  });

  const cleanData = (data) => {
    const { title, slug, content, status, category } = data;
    return { title, slug, content, status, category };
  };

  const submit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      console.debug("Form data before clean:", data);
      const valid = cleanData(data);

      if (post) {
        let fileId = post.featuredImage;

        if (data.image?.[0]) {
          const file = await storageService.uploadFile(data.image[0]);
          if (post.featuredImage) {
            await storageService.deleteFile(post.featuredImage);
          }
          fileId = file.$id;
        }

        const dbPost = await databaseService.updatePost(post.$id, {
          ...valid,
          featuredImage: fileId,
        });

        if (dbPost) {
          dispatch(updatePost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        let fileId = null;

        if (data.image?.[0]) {
          const file = await storageService.uploadFile(data.image[0]);
          fileId = file.$id;
        }

        const dbPost = await databaseService.createPost({
          ...valid,
          featuredImage: fileId,
          userId: userData.$id,
        });

        if (dbPost) {
          dispatch(addPost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Post Submit Error:", error);
      setError(error.message || "Failed to submit post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          ❌ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <Input
              label="Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Slug"
              {...register("slug", { required: "Slug is required" })}
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Input
              type="file"
              label="Featured Image"
              {...register("image", {
                required: !post ? "Image is required for new posts" : false,
              })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <Select
              label="Status"
              options={[
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
                { label: "Archived", value: "archived" },
              ]}
              {...register("status")}
            />
          </div>

          <div>
            <Input
              label="Category"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : post ? "Update Post" : "Submit Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
