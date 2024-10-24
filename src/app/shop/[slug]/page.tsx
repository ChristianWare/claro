/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./SlugPage.module.css";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper";
import DOMPurify from "isomorphic-dompurify";
import ProductImages from "@/components/ProductImages/ProductImages";
import SlugIntro from "@/components/SlugIntro/SlugIntro";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import Calendar from "../../../../public/icons/calendar.svg";
import Rotate from "../../../../public/icons/rotate.svg";
import Mailbox from "../../../../public/icons/mailbox.svg";
import Globe from "../../../../public/icons/globe.svg";
// import { Suspense } from "react";

interface DataItem {
  id: number;
  icon: JSX.Element;
  text: string;
}


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

const SlugPage = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);

  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  const shortDesc = product.additionalInfoSections
    ? product.additionalInfoSections.find(
        (section: any) => section.title === "shortDesc"
      )?.description || ""
    : "";

  return (
    <main className={styles.container}>
      <SlugIntro />
      <br />
      <br />
      <br />
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <ProductImages items={product.media?.items} />
          </div>
          <div className={styles.right}>
            <h1 className={styles.heading}>{product.name}</h1>
            <span className={styles.price}>
              USD ${product.priceData?.price}
            </span>

            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortDesc),
              }}
            ></div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <GalleryGrid items={product.media?.items} />
        <br />
        <br />
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
      </LayoutWrapper>
    </main>
  );
};
export default SlugPage;
