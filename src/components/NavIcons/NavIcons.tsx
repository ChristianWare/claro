"use client";

import styles from "./NavIcons.module.css";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
// import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import ProfileIcon from "../../../public/icons/profile.svg";
import BasketIcon from "../../../public/icons/basket.svg";
import Modal from "../Modal/Modal";
// import Link from "next/link";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const wixClient = useWixClient();

  const handleCloseModal = () => {
    setIsCartOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className={styles.container}>
      <ProfileIcon className={styles.icon} />
      <div className={styles.basketContainer}>
        <BasketIcon
          className={styles.icon}
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className={styles.counter}>
          <p>{counter}</p>
        </div>
      </div>
      {isCartOpen && (
        <Modal isOpen={isCartOpen} onClose={handleCloseModal}>
          <h3>Cart Info Here</h3>
          <h6 className={styles.copy}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            cum a ad similique quae sapiente, doloribus commodi, deserunt quasi
            pariatur at facere consequuntur ipsam culpa enim, earum dignissimos
            amet? Reprehenderit?
          </h6>
        </Modal>
      )}
    </div>
  );
};
export default NavIcons;
