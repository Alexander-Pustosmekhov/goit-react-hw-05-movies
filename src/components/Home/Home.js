import HomeList from './HomeList';
import s from './Home.module.css';

export default function Home() {
  return (
    <>
      <h1 className={s.title}>Trending today</h1>
      <HomeList />
    </>
  );
}
