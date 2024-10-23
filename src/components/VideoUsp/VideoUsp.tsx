import styles from "./VideoUsp.module.css";

const VideoUsp = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <video preload='auto' autoPlay muted loop className={styles.video}>
          <source src='./video/lossless.mp4' />
        </video>
        <div className={styles.imgOverlay}></div>
        <div className={styles.contentChildren}>
          <span className={styles.heading2}>
            Experience world class quality
          </span>
          <h2 className={styles.heading} lang='en'>
            Lossless audio like you&apos;ve <br /> never experienced{" "}
          </h2>
        </div>
      </div>
    </section>
  );
};
export default VideoUsp;
