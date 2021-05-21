import style from "./style.module.scss";
import { useHistory } from "react-router-dom";

export default function PostBox({ post, deletePost }) {
  const router = useHistory();
  const { id, title } = post;
  return (
    <div className={style.post_container}>
      <div className={style.title_container}>
        <p>
          {id}. {title.toUpperCase()}
        </p>
      </div>
      <div className={style.buttons_container}>
        <button onClick={() => router.push(`/details/${id}`)}>Detalles</button>

        <button onClick={() => router.push(`/edit/${id}`)}>Editar</button>

        <button onClick={() => deletePost(id)}>Eliminar</button>
      </div>
    </div>
  );
}
