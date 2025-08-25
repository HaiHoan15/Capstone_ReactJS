import { useEffect } from "react";
import Movie from "./Movie";
import { useSelector, useDispatch } from "react-redux";
import { fetchListMovie } from "./slice";

export default function ListMoviePage() {
  const { data, loading, error } = useSelector((state) => state.listMovieSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{String(error)}</p>;

  return (
    <div
      style={{
        backgroundImage: 'url(/images/HomePageBackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">Danh sách phim</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data && data.map((movie) => <Movie key={movie.maPhim} movie={movie} />)}
        </div>
      </div>
    </div>
  );
}
