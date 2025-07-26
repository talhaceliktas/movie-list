// https://www.omdbapi.com/?apikey=68a277b3&s=test

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_KEY = "68a277b3";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        if (query.length === 0) return;

        setIsLoading(true);
        setError("");

        if (query.length < 3) {
          setMovies([]);
          setError("Type at least 3 letters to search for a movie.");
          throw new Error("Type at least 3 letters to search for a movie.");
        }

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Fetch error!");
        }
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        toast.dismiss();
        setMovies(data.Search);
        setError("");
      } catch (err) {
        toast.dismiss();
        toast.error(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
