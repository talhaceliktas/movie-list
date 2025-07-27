import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useFetchMovie(imdbID) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!API_KEY) {
      console.error("OMDB API key is missing. Please check your .env file.");
      setError("API configuration error");
      return;
    }

    if (!imdbID) return;

    const controller = new AbortController();

    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `${API_BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Movie details not found");
        }

        setMovie(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch movie details error:", err);
          toast.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();

    return function () {
      controller.abort();
    };
  }, [imdbID]);

  return { movie, isLoading, error };
}
