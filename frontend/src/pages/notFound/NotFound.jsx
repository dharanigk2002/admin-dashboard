import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.errorPage}>
      <h1>404 The page your are looking for is not found :(</h1>
      <button onClick={() => navigate("/", { replace: true })}>
        &lt;&mdash;back
      </button>
    </div>
  );
}

export default NotFound;
