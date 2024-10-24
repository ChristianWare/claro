"use client";

import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import Plus from "../../../public/icons/plus.svg";
import styles from "./ToggleDescription.module.css"; // Create this CSS file for styling

interface ToggleDescriptionProps {
  description: string;
}

const ToggleDescription = ({ description }: ToggleDescriptionProps) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div>
      {/* Toggle Button (Plus Icon and Read More) */}
      <div className={styles.readMoreContainer} onClick={toggleDescription}>
        <Plus className={styles.plusIcon} />
        <span className={styles.readMoreText}>
          {isDescriptionVisible ? "Read less" : "Read more"}
        </span>
      </div>

      {/* Description, hidden by default */}
      {isDescriptionVisible && (
        <div
          className='text-sm text-gray-500'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        ></div>
      )}
    </div>
  );
};

export default ToggleDescription;
