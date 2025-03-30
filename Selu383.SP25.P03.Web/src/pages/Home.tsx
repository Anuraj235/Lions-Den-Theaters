import MovieCarousel from "../Components/MovieCarousel";
import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import { useNavigate } from "react-router-dom";
import { movieService } from "../services/api";
import { Movie } from "../Data/MovieInterfaces";
import { useTheater } from "../context/TheaterContext"; // 🎬 Import theater context

const Home = () => {
  const navigate = useNavigate();
  const { theater } = useTheater(); // 🎬 Grab selected theater

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!theater) return; // Wait for theater selection
      try {
        setLoading(true);
        const data = await movieService.getAll(theater); // 🎯 Filter by theater
        setMovies(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [theater]);

  const nowShowing = movies.filter(
    (movie) => new Date(movie.releaseDate) <= new Date()
  );
  const comingSoon = movies.filter(
    (movie) => new Date(movie.releaseDate) > new Date()
  );
  const topRated = [...movies]
    .filter((movie) => movie.rating)
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 5);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!theater) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        🎬 Please select a theater from the top dropdown to explore movies.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <MovieCarousel />

      {/* Navigation Tabs */}
      <div className="flex justify-start space-x-8 text-lg font-bold ml-10 mt-6">
        <button onClick={() => scrollToSection("nowPlaying")} className="text-red-500">
          🎬 Now Playing
        </button>
        <button onClick={() => scrollToSection("comingSoon")} className="text-blue-500">
          🚀 Coming Soon
        </button>
        <button onClick={() => scrollToSection("topRated")} className="text-yellow-500">
          ⭐ Top Rated
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <div className="text-center py-10">Loading movies...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {/* Now Playing */}
      <section id="nowPlaying" className="container mx-auto py-10">
      <SectionTitle title={`🎬 Now Showing in ${theater}`} />

        <MovieGrid movies={nowShowing} fallback="No movies currently showing" />
      </section>

      {/* Coming Soon */}
      <section id="comingSoon" className="container mx-auto py-10">
      <SectionTitle title={`🚀 Coming Soon to ${theater}`} />
        <MovieGrid movies={comingSoon} fallback="No upcoming movies scheduled" />
      </section>

      {/* Top Rated */}
      <section id="topRated" className="container mx-auto py-10">
      <SectionTitle title={`⭐ Top Rated at ${theater}`} />
        <MovieGrid movies={topRated} fallback="No rated movies available" />
      </section>

      {/* Membership Section */}
      <section className="bg-[#7c0000] p-10 text-center mt-16">
        <h2 className="text-3xl font-bold">
          Get early access, discounts, and more with Lion’s Den Plus.
        </h2>
        <p className="mt-2">Unlock unlimited movies and exclusive perks.</p>
        <button
          onClick={() => navigate("/register")}
          className="mt-4 px-6 py-2 bg-white text-red-600 font-bold rounded-md hover:bg-red-100 transition duration-300"
        >
          Join Now
        </button>
      </section>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <div className="relative my-10">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-700"></div>
    </div>
    <div className="relative flex justify-center">
      <span className="bg-gray-900 px-4 text-lg font-semibold text-white">
        {title}
      </span>
    </div>
  </div>
);

const MovieGrid = ({
  movies,
  fallback,
}: {
  movies: Movie[];
  fallback: string;
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
    {movies.length > 0 ? (
      movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterUrl={movie.posterUrl}
          releaseDate={movie.releaseDate}
          genre={movie.genre}
          rating={movie.rating}
        />
      ))
    ) : (
      <div className="col-span-full text-center py-10">{fallback}</div>
    )}
  </div>
);

export default Home;
