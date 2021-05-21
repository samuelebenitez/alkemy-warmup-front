import style from "./style.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <button className={style.header_button1}> HOME</button>
      </Link>
      <Link to="/create">
        <button className={style.header_button2}> CREATE A NEW POST </button>
      </Link>
    </header>
  );
}
