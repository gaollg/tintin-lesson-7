import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">作业</Link>
        </li>
        <li>
          <a href="https://github.com/gaollg/tintin-lesson-6">Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
