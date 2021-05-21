import { useState, useEffect } from "react";
import style from "./style.module.scss";
import Header from "../../components/Header";
import PostBox from "../../components/PostBox";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const getPostsUrl = "http://jsonplaceholder.typicode.com/posts";

  async function getPosts() {
    try {
      const { data } = await axios.get(getPostsUrl);
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deletePost(id) {
    await axios
      .delete(`http://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => console.log(res.status));
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts.reverse());
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={style.App}>
      <Header />

      <h1>Mis posts: </h1>
      <div className={style.posts_container}>
        {posts
          .reverse()
          .slice(0, 9)
          .map((post) => (
            <PostBox key={post.id} post={post} deletePost={deletePost} />
          ))}
      </div>
    </div>
  );
}

export default App;
