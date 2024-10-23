/* eslint-disable @typescript-eslint/no-explicit-any */
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import WixImage from "../WixImage/WixImage"; // Import WixImage
import styles from "./ProductList.module.css";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  // Fetch the products
  const res = await productQuery.find();

  // Manually sort the products based on the searchParams.sort
  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortBy === "price") {
      // Sort products by price
      res.items.sort((a: any, b: any) => {
        if (sortType === "asc") {
          return a.priceData.price - b.priceData.price;
        } else if (sortType === "desc") {
          return b.priceData.price - a.priceData.price;
        }
        return 0; // Fallback in case sortType is not recognized
      });
    } else if (sortBy === "lastUpdated") {
      // Sort products by lastUpdated
      res.items.sort((a: any, b: any) => {
        const dateA = new Date(a.lastUpdated);
        const dateB = new Date(b.lastUpdated);
        if (sortType === "asc") {
          return dateA.getTime() - dateB.getTime();
        } else if (sortType === "desc") {
          return dateB.getTime() - dateA.getTime();
        }
        return 0; // Fallback
      });
    }
  }

  // Render the products
  return (
    <div className={styles.container}>
      {res.items.map((product: products.Product) => (
        <Link
          href={"/shop/" + product.slug}
          key={product._id}
          className={styles.card}
        >
          <WixImage
            mediaIdentifier={product.media?.mainMedia?.image?.url}
            alt={product.media?.mainMedia?.image?.altText || ""}
            width={500}
            height={500}
            className={styles.img}
          />

          <div className={styles.infoSection}>
            <p className={styles.productName}>{product.name}</p>
            {product.additionalInfoSections && (
              <div
                className={styles.addInfoDetails}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections
                      .find((section: any) => section.title === "shortDesc")
                      ?.description?.slice(0, 22) || ""
                  ),
                }}
              ></div>
            )}
            <p className={styles.price}>${product.priceData?.price}</p>
          </div>
          {/* <button className='rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white'>
            Add to Cart
          </button> */}
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
