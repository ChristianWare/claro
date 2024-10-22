/* eslint-disable @typescript-eslint/no-explicit-any */
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
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
  return (
    <div className={styles.container}>
      <h3>Product List</h3>
    </div>
  );
};
export default ProductList;
