import { useState, useEffect } from "react";
import style from "./style.module.scss";
import { useParams, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";

export default function Edit() {
  const router = useHistory();
  const [postValues, setPostValues] = useState({
    title: "",
    body: "",
  });
  const [errorEmpty, setErrorEmpty] = useState(false);
  const [postSended, setPostSended] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const { id } = useParams();
  const postUrl = `http://jsonplaceholder.typicode.com/posts/${id}`;

  async function getPost() {
    try {
      const { data } = await axios.get(postUrl);
      setPostValues(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  function axiosPost() {
    if ((postValues.title && postValues.body !== null) || undefined || "") {
      axios.put(postUrl, postValues).then((res) => {
        if (res.status === 200) {
          setPostSended(true);
          setErrorEmpty(false);
          setPostValues({
            body: "",
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
        <h1>Editar post</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">ID</label>
          <input
            type="number"
            value={id}
            name="id"
            readOnly={true}
            disabled={true}
          />
          <label htmlFor="title">Título</label>
          <input
            type="text"
            placeholder="Título"
            name="title"
            value={postValues.title}
            onChange={(e) =>
              setPostValues({ ...postValues, title: e.target.value })
            }
          />

          <label htmlFor="content">Contenido</label>
          <textarea
            type="text"
            placeholder="Contenido"
            name="body"
            value={postValues.body}
            onChange={(e) =>
              setPostValues({ ...postValues, body: e.target.value })
            }
          />
          <button disabled={postSended}>
            {postSended
              ? "¡POST ACTUALIZADO! Serás dirigido a Home"
              : "ACTUALIZAR"}
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
