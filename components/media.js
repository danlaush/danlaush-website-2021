import Image from 'next/image';
import styles from './media.module.css';

const Media = ({src, alt, width, height, caption}) => (
  <>
    <div className={styles.mediaContainer}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        sizes="
          calc(100vw - 3rem),
          (min-width: 67rem) 64rem
        "
        />
    </div>
    <p className={styles.caption}>{caption}</p>
  </>
)

const MediaSection = ({src, alt, width, height, caption}) => (
  <section className={styles.section}>
    <Media src={src} alt={alt} width={width} height={height} caption={caption} />
  </section>
)

export default Media;

export {
  Media,
  MediaSection
}
