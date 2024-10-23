/* eslint-disable @typescript-eslint/no-explicit-any */
import PageIntro from "@/components/PageIntro/PageIntro";
import Shop from "../../../public/images/shop.jpg";
import { wixClientServer } from "@/lib/wixClientServer";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Suspense } from "react";
import ProductList from "@/components/ProductList/ProductList";

const ShopPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <main>
      <PageIntro
        src={Shop}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Shop CLARO'
      />
      <LayoutWrapper>
        <h2 className='mt-12 text-xl font-semibold'>
          {cat?.collection?.name} For You!
        </h2>
        <Suspense fallback='loading'>
          <ProductList
            categoryId={
              cat.collection?._id || "00000000-000000-000000-000000000001"
            }
            searchParams={searchParams}
          />
        </Suspense>
      </LayoutWrapper>
    </main>
  );
};
export default ShopPage;
