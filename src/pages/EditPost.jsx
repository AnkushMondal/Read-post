import React, { useEffect } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPost } from "../features/post/postSlice";
import databaseService from "../appwrite/database";

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.currentPost);

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

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;