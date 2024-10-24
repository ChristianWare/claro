/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./GalleryGrid.module.css";
import LayoutWrapper from "../LayoutWrapper";
import Back from "../../../public/icons/back.svg";
import Next from "../../../public/icons/next.svg";
import Cancel from "../../../public/icons/close.svg";

interface iAppProps {
  items: any;
}

const GalleryGrid = ({ items }: iAppProps) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index: number) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    setSlideNumber(slideNumber === 0 ? items.length - 1 : slideNumber - 1);
  };

  const nextSlide = () => {
    setSlideNumber(slideNumber + 1 === items.length ? 0 : slideNumber + 1);
  };

  // Handle keyboard events for modal navigation and closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!openModal) return;

      switch (e.key) {
        case "ArrowLeft":
          prevSlide();
          break;
        case "ArrowRight":
          nextSlide();
          break;
        case "Escape":
          handleCloseModal();
          break;
        default:
          break;
      }
    };

    // Add event listener for keydown when the modal is open
    if (openModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Clean up event listener when the modal is closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal, slideNumber]);

  return (
    <div className={styles.container}>
      <h6 className={styles.heading2}>Gallery</h6>
      <div className={styles.gallery}>
        {items.map((item: any, index: number) => (
          <div key={item.id || index} className={styles.imgContainer4}>
            <Image
              src={item.image?.url} // Use the same structure as in ProductImages
              alt={item?.image?.alt || `Image ${index + 1}`}
              fill
              className={styles.img}
              onClick={() => handleOpenModal(index)}
            />
          </div>
        ))}
      </div>

      {openModal && (
        <LayoutWrapper>
          <div className={styles.modalContainer}>
            <div onClick={handleCloseModal}>
              <Cancel
                className={styles.close}
                onClick={handleCloseModal}
                width={40}
                height={40}
              />
            </div>
            <div className={styles.fullScreenImage}>
              <Back
                className={styles.prev}
                onClick={prevSlide}
                width={40}
                height={40}
              />
              <Image
                src={items[slideNumber]?.image?.url} // Use the same structure for full-screen view
                alt={
                  items[slideNumber]?.image?.alt || `Image ${slideNumber + 1}`
                }
                fill
                className={styles.modalImg}
              />
              <Next
                className={styles.next}
                onClick={nextSlide}
                width={40}
                height={40}
              />
            </div>
          </div>
        </LayoutWrapper>
      )}
    </div>
  );
};

export default GalleryGrid;
