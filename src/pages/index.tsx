
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Movie Explorer</h1>
      <Link href="/PopularMovies">
        View Popular Movies
      </Link>
    </div>
  );
};

export default Home;
