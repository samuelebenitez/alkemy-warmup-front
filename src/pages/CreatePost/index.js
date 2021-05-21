import Header from "../../components/Header";
import style from "./style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CreatePost() {
  const router = useHistory();
  const [errorEmpty, setErrorEmpty] = useState(false);
  const [postSended, setPostSended] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const postReqUrl = "https://jsonplaceholder.typicode.com/posts";
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  function axiosPost() {
    if (post.title.length && post.content.length !== 0) {
      axios.post(postReqUrl, post).then((res) => {
        if (res.status === 201) {
          setPostSended(true);
          setErrorEmpty(false);
          setPost({
            content: "",
            title: "",
          });
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          setErrorApi(true);
        }
      });
    } else {
      setErrorEmpty(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className={style.form_container}>
        <h1>Crear un nuevo post</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Título</label>
          <input
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="Título"
            name="title"
            value={post.title}
          />

          <label htmlFor="content">Contenido</label>
          <textarea
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            type="text"
            placeholder="Contenido"
            name="content"
            value={post.content}
          />
          <button disabled={postSended}>
            {postSended
              ? "¡POST CREADO! Serás dirigido a Home"
              : "PUBLICAR POST"}
          </button>
          {errorEmpty ? <h2>Ambos campos son obligatorios!</h2> : null}
          {errorApi ? (
            <h2>Hubo un error con el servidor, intenta de nuevo más tarde!</h2>
          ) : null}
        </form>
      </div>
    </>
  );
}
