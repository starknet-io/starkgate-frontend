import React, { useEffect, useState } from 'react';
import styles from './JumpToTop.module.scss';

export const JumpToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={styles.jumpToTop}
    >
      ↑ Top
    </button>
  );
};