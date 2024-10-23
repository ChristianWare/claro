import { Suspense } from "react";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./Popular.module.css";
import ProductList from "../ProductList/ProductList";
import Calendar from "../../../public/icons/calendar.svg";
import Rotate from "../../../public/icons/rotate.svg";
import Mailbox from "../../../public/icons/mailbox.svg";
import Globe from "../../../public/icons/globe.svg";

interface DataItem {
  id: number;
  icon: JSX.Element;
  text: string;
}

const Popular = () => {
  const data = [
    {
      id: 1,
      icon: <Calendar width={50} height={50} className={styles.icon} />,
      text: "90 Day Guarantee",
    },
    {
      id: 2,
      icon: <Rotate width={50} height={50} className={styles.icon} />,
      text: "30 Day Returns",
    },
    {
      id: 3,
      icon: <Mailbox width={50} height={50} className={styles.icon} />,
      text: "Ships Next Day",
    },
    {
      id: 4,
      icon: <Globe width={50} height={50} className={styles.icon} />,
      text: "Ships Globally",
    },
  ];

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
      <div className={styles.parent}>
        <LayoutWrapper>
          <div className={styles.bottomii}>
            {data.map((x: DataItem) => (
              <div key={x.id} className={styles.box}>
                {x.icon}
                <p className={styles.text}>{x.text}</p>
              </div>
            ))}
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
};
export default Popular;
