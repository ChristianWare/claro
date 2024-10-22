import { Suspense } from "react";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./Popular.module.css";

const Popular = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.heading}>Popular</h2>
            <p className={styles.explore}>Explore the shop</p>
          </div>
          <div className={styles.bottom}>
                  <Suspense fallback='Loading...'>
                    
                  </Suspense>

          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default Popular;
