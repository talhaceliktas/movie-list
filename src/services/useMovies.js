import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // API anahtarı kontrolü
    if (!API_KEY) {
      console.error("OMDB API key is missing. Please check your .env file.");
      setError("API configuration error");
      return;
    }

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        // Boş query kontrolü
        if (query.length === 0) {
          setMovies([]);
          setError("");
          return;
        }

        setIsLoading(true);
        setError("");

        // Minimum karakter kontrolü
        if (query.length < 3) {
          setMovies([]);
          setError("Type at least 3 letters to search for a movie.");
          return;
        }

        const res = await fetch(
          `${API_BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
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
          throw new Error(data.Error || "Movie not found");
        }

        toast.dismiss();
        setMovies(data.Search || []);
        setError("");
      } catch (err) {
        toast.dismiss();

        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          toast.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // Debounce effect - API çağrılarını sınırla
    const timeoutId = setTimeout(fetchMovies, 300);

    return function () {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
