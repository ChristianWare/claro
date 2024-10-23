/* eslint-disable @typescript-eslint/no-explicit-any */
import PageIntro from "@/components/PageIntro/PageIntro";
import Shop from "../../../public/images/shop.jpg";
// import { wixClientServer } from "@/lib/wixClientServer";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Suspense } from "react";
import ProductList from "@/components/ProductList/ProductList";
import FinalCTA from "@/components/FinalCTA/FinalCTA";

const ShopPage = async ({ searchParams }: { searchParams: any }) => {
  // const wixClient = await wixClientServer();

  // const cat = await wixClient.collections.getCollectionBySlug(
  //   searchParams.cat || "all-products"
  // );

  return (
    <main>
      <PageIntro
        src={Shop}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Shop CLARO'
      />
      <LayoutWrapper>
        <Suspense fallback='loading'>
          <h2>Earbuds</h2>
          <ProductList
            categoryId={process.env.EARBUDS_CATEGORY_ID!}
            searchParams={searchParams}
          />
          <br />
          <br />
          <br />
          <h2>Headphones</h2>
          <ProductList
            categoryId={process.env.HEADPHONES_CATEGORY_ID!}
            searchParams={searchParams}
          />
          <br />
          <br />
          <br />
        </Suspense>
      </LayoutWrapper>
      <FinalCTA />
    </main>
  );
};
export default ShopPage;
