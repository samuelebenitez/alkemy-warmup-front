import { useState, useEffect } from "react";
import Header from "../../components/Header";
import style from "./style.module.scss";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [error, setError] = useState(false);
  const getPostUrl = `http://jsonplaceholder.typicode.com/posts/${id}`;

  async function getPost() {
    try {
      const { data } = await axios.get(getPostUrl);
      setPost(data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  const { title, body } = post;
  return (
    <>
      <Header />
      <div className={style.details_container}>
        {!error ? (
          <>
            <h2>{title}</h2>
            <p>{body}</p>
            <div className={style.buttons_container}>
              <Link to={`/edit/${id}`}>
                <button>Editar</button>
              </Link>
            </div>
          </>
        ) : (
          <h2>No se encuentra detalles con el ID especificado.</h2>
        )}
      </div>
    </>
  );
}
