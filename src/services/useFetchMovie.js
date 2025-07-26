import { useEffect, useState } from "react";

const API_KEY = "68a277b3";

export default function useFetchMovie(imdbID) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!imdbID) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
        );

        if (!res.ok) throw new Error("Fetch error!");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovieDetails(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [imdbID]);

  return { movieDetails, isLoading, error };
}
