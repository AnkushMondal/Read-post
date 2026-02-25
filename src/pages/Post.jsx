import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPost,
  deletePost as deletePostAction,
} from "../features/post/postSlice";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/storage";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.currentPost);
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        const response = await databaseService.getPost(slug);

        if (response) {
          dispatch(setCurrentPost(response));
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Fetch Post Error:", error);
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate, dispatch]);

  const deletePostHandler = async () => {
    try {
      const status = await databaseService.deletePost(post.$id);

      if (status) {
        await storageService.deleteFile(post.featuredImage);

        dispatch(deletePostAction(post.$id));
        navigate("/");
      }
    } catch (error) {
      console.error("Delete Post Error:", error);
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={storageService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePostHandler}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
