/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
// import WixImage from "../WixImage/WixImage";
import styles from "./ProductImages.module.css";
import Image from "next/image";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className=''>
      <div className={styles.imgContainer}>
        <Image
          src={items[index].image?.url}
          alt=''
          fill
          className={styles.img}
        />
        ;
      </div>
      <div className='flex justify-between gap-4 mt-8'>
        {items.map((item: any, i: number) => (
          <div
            className='w-1/4 h-32 relative gap-4 mt-8 cursor-pointer'
            key={item.id}
            onClick={() => setIndex(i)}
          >
            {/* <Image
              src={item.image?.url}
              alt=''
              fill
              sizes='30vw'
              className='object-cover rounded-md'
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImages;

//  <WixImage
//    mediaIdentifier={product.media?.mainMedia?.image?.url}
//    alt={product.media?.mainMedia?.image?.altText || ""}
//    width={500}
//    height={500}
//    className={styles.img}
//  />;
//  {
//    product.media?.items && (
//      <WixImage
//        mediaIdentifier={product.media?.items[1]?.image?.url || "/product.png"}
//        alt={product.media?.mainMedia?.image?.altText || ""}
//        width={100}
//        height={100}
//        className={styles.img}
//      />
//    );
//  }
