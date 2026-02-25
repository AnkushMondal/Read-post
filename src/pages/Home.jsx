import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features/post/postSlice";
import databaseService from "../appwrite/database";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databaseService.getPosts();

        if (response) {
          // For TablesDB use response.rows
          dispatch(setPosts(response.rows || response.documents));
        }
      } catch (error) {
        console.error("Fetch Posts Error:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id || post.slug} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;