import Nav from "../Nav/Nav";
import styles from "./SlugIntro.module.css";

const SlugIntro = () => {
  return (
    <div className={styles.parent}>
      <section className={styles.container}>
        <div className={styles.navContainer}>
          <Nav color='black' />
        </div>
      </section>
    </div>
  );
};

export default SlugIntro;
