/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./SlugPage.module.css";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper";
import DOMPurify from "isomorphic-dompurify";
import ProductImages from "@/components/ProductImages/ProductImages";
import SlugIntro from "@/components/SlugIntro/SlugIntro";

// import { Suspense } from "react";

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
              {/* USD ${product.priceData?.price} */}
            </span>

            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortDesc),
              }}
            ></div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description ?? ""),
              }}
            ></div>
          </div>
        </div>
      </LayoutWrapper>
    </main>
  );
};
export default SlugPage;
