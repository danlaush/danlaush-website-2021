import { useActiveHash } from "../lib/useActiveHash";
import styles from "./table-of-contents.module.css";

// Unintuitive, but extract data from the React
// component object structure. rehype-toc generates
// HTML elements, so we have to get the data out of
// existing React components??
const extractProps = (propsRaw) => {
  // TOC's only child is an ol.
  // That component has an array of items
  const list = propsRaw.children.props.children;
  const items = list.map((li) => {
    const {
      props: { children: a },
    } = li;
    const {
      props: { href, children },
    } = a;
    return {
      href,
      title: children,
    };
  });
  return { items };
};

export const TableOfContents = (propsRaw) => {
  const { items } = extractProps(propsRaw);
  const hashes = items.map((i) => i.href);
  const activeHash = useActiveHash(hashes);
  return (
    <div className={styles.toc}>
      <ol className={styles.list}>
        {items.map((i) => (
          <li
            className={[
              styles.item,
              activeHash === i.href ? styles.active : ""
            ].filter(Boolean).join(" ")}
            key={i.href}
          >
            <a href={i.href}>{i.title}</a>
          </li>
        ))}
      </ol>
    </div>
  );
};
