import Image from 'next/image';
import styles from './media.module.css';

const Media = ({src, alt, width, height, caption, sizes}) => (
  <>
    <div className={styles.mediaContainer}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        sizes={sizes}
        />
    </div>
    <p className={styles.caption}>{caption}</p>
  </>
)

const MediaSection = ({src, alt, width, height, caption}) => (
  <section className={styles.section}>
    <Media
      src={src}
      alt={alt}
      width={width}
      height={height}
      caption={caption}
      sizes="
        calc(100vw - 3rem),
        (min-width: 67rem) 64rem
      "
      />
  </section>
)

export default Media;

export {
  Media,
  MediaSection
}
