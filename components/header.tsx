import styles from "@styles/Home.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <ul className={styles.headerMenu}>
        <li className={styles.menuTitle}>
          <span className={styles.highlight}>
            <Link href="/post">blog</Link>
          </span>
        </li>

        <li className={styles.menuTitle}>
          <span className={styles.highlight}>
            <Link href="/about">about</Link>
          </span>
        </li>
      </ul>

      <Link href="/">
        <h1 className={styles.title}>abs(YES)</h1>
      </Link>
    </div>
  );
};

export default Header;
