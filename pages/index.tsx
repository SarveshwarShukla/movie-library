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
  upcomingMovies,
  latestMovies,
  upcomingShows,
  latestShows,
}) => {
  
  const [session] = useSession()
  return (
    <div className="">
      <Head>
        <title>Movie Library</title>
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
          <MoviesCollections results={upcomingMovies} title="Upcoming Movies"/>
          <MoviesCollections results={latestMovies} title="Latest Movies"/>


          <ShowsCollections results={popularShows} title="Popular Shows"/>
          <ShowsCollections results={top_ratedShows} title="Top Rated Shows" />
          <ShowsCollections results={upcomingShows} title="Upcoming Shows"/>
          <ShowsCollections results={latestShows} title="Latest Shows"/>
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
    upcomingMoviesRes,
    latestMoviesRes,
    upcomingShowsRes,
    latestShowsRes,

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
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=2`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=3`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=5`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=3`
    ),


  ]);
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows, upcomingMovies, latestMovies, upcomingShows, latestShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
      upcomingMoviesRes.json(),
      latestMoviesRes.json(),
      upcomingShowsRes.json(),
      latestShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
      upcomingMovies: upcomingMovies.results,
      latestMovies: latestMovies.results,
      upcomingShows: upcomingShows.results,
      latestShows: latestShows.results,
    },
  };
}
