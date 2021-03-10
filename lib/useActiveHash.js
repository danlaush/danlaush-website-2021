/**
 *
 * Further info 👉🏼 https://github.com/gatsbyjs/gatsby/blob/master/www/src/hooks/use-active-hash.js
 *
 */

import { useEffect, useState } from "react";

export const useActiveHash = (itemHashes, rootMargin = undefined) => {
  const [activeHash, setActiveHash] = useState(``);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: rootMargin || `0% 0% -90% 0%` }
    );

    const trigger = (hash, key) => {
      const element = document.querySelector(hash);
      element && typeof element === `object` ? observer[key](element) : null;
    };

    itemHashes.map((hash) => trigger(hash, `observe`));

    return () => itemHashes.map((hash) => trigger(hash, `unobserve`));
  }, []);

  return activeHash;
};
