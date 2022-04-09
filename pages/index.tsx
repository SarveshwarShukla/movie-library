import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client'
import Hero from '../components/Hero'
import Slider from '../components/Slider'
import Brands from '../components/Brands'
import MoviesCollections from '../components/MoviesCollection'
import ShowsCollections from '../components/ShowsCollection'

const Home: NextPage = ({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) => {
  console.log(popularMovies);
  
  const [session] = useSession()
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <main className="relative min-h-screen after:absolute after:inset-0 after:z-[-1] after:bg-home after:bg-cover after:bg-fixed after:bg-center after:bg-no-repeat">
          <Slider />
          <Brands />
          <MoviesCollections results={popularMovies} title="Popular Movies"/>
          <MoviesCollections results={top_ratedMovies} title="Top Rated Movies"/>
          <ShowsCollections results={popularShows} title="Popular Shows"/>
          <ShowsCollections results={top_ratedShows} title="Top Rated Shows" />
        </main>
      )}
    </div>
  )
}

export default Home
export async function getServerSideProps(context) {
  const session = await getSession(context);

  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ]);
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  };
}
