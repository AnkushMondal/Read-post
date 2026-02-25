import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features/post/postSlice";
import databaseService from "../appwrite/database";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databaseService.getPosts();

        if (response) {
          dispatch(setPosts(response.rows || response.documents));
        }
      } catch (error) {
        console.error("Fetch Posts Error:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id || post.slug} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
