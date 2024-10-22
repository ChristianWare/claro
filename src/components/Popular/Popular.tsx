import { Suspense } from "react";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./Popular.module.css";
import ProductList from "../ProductList/ProductList";

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
              <ProductList
                categoryId={process.env.POPULAR_CATEGORY_ID!}
                limit={4}
              />
            </Suspense>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default Popular;
