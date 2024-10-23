"use client";

import styles from "./Nav.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
// import Logo from "../../../public/icons/logo.png";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (window.innerWidth <= 968 && isOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }

    const handleResize = () => {
      setIsOpen(false);
      window.addEventListener("resize", handleResize);
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      if (body) {
        body.style.overflow = "auto";
      }
    };
  }, [isOpen]);

  const navItems = [
    {
      text: "shop",
      href: "/shop",
    },
    {
      text: "About Us",
      href: "/about",
    },
    {
      text: "Locations",
      href: "/locations",
    },

    {
      text: "Support",
      href: "/support",
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link href='/' className={styles.logo}>
            CLARO
          </Link>
          <ul
            className={
              isOpen === false
                ? styles.navMenu
                : `${styles.navMenu} ${styles.active}`
            }
          >
            {navItems.map((navItem, index) => (
              <li
                key={index}
                className={styles.navItem}
                onClick={() => setIsOpen(false)}
              >
                <Link href={navItem.href} className={styles.navItem}>
                  {navItem.text}
                </Link>
              </li>
            ))}
          </ul>
          {isOpen && (
            <div
              className={`${styles.overlay} ${
                isOverlayVisible ? styles.visible : ""
              }`}
              onClick={() => {
                setIsOpen(false);
                setIsOverlayVisible(false);
              }}
            ></div>
          )}
          <span
            className={
              isOpen === false
                ? styles.hamburger
                : `${styles.hamburger} ${styles.active}`
            }
            onClick={openMenu}
          >
            <span className={styles.whiteBar}></span>
            <span className={styles.whiteBar}></span>
            <span className={styles.whiteBar}></span>
          </span>
        </nav>
      </header>
      <div className={styles.greenTop}></div>
    </>
  );
}

export default Nav;
