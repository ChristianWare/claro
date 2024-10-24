/* eslint-disable @typescript-eslint/no-explicit-any */
import PageIntro from "@/components/PageIntro/PageIntro";
import Img from "../../../../public/images/headphonesii.jpg";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Suspense } from "react";
import ProductList from "@/components/ProductList/ProductList";
import FinalCTA from "@/components/FinalCTA/FinalCTA";
import styles from "../ShopPage.module.css";
import CategoryNav from "@/components/CategoryNav/CategoryNav";

const HeadphonesPage = async ({ searchParams }: { searchParams: any }) => {
  return (
    <main>
      <PageIntro
        src={Img}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Shop headphones'
      />
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <CategoryNav />
          </div>
          <div className={styles.right}>
            <Suspense fallback='loading'>
              <ProductList
                categoryId={process.env.HEADPHONES_CATEGORY_ID!}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </LayoutWrapper>
      <FinalCTA />
    </main>
  );
};

export default HeadphonesPage;
