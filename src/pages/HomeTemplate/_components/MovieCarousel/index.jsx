import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMovie } from "../../ListMoviePage/slice";
import Movie from "../../ListMoviePage/Movie";

const STEP_SIZE = 2;      
const VISIBLE_COUNT = 8;  

export default function MovieCarousel() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listMovieSlice);

  const [filter, setFilter] = useState("dangChieu"); 
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return filter === "dangChieu"
      ? data.filter((m) => m.dangChieu)
      : data.filter((m) => m.sapChieu);
  }, [data, filter]);

  useEffect(() => {
    setStartIndex(0);
  }, [filter, filtered.length]);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (!filtered.length) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-x-2 mb-4">
          <button
            onClick={() => setFilter("dangChieu")}
            className={`px-4 py-2 rounded ${filter === "dangChieu" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            PHIM ĐANG CHIẾU
          </button>
          <button
            onClick={() => setFilter("sapChieu")}
            className={`px-4 py-2 rounded ${filter === "sapChieu" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            PHIM SẮP CHIẾU
          </button>
        </div>
        <p>Không có phim phù hợp.</p>
      </div>
    );
  }

  const windowItems = Array.from({ length: VISIBLE_COUNT }).map((_, i) => {
    const idx = (startIndex + i) % filtered.length;
    return filtered[idx];
  });

  const canPrev = filtered.length > VISIBLE_COUNT;
  const canNext = filtered.length > VISIBLE_COUNT;

  return (
    <div className="container mx-auto p-4" backgroundColor="#ffffffff">
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setFilter("dangChieu")}
            className={`px-4 py-2 rounded ${filter === "dangChieu" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            PHIM ĐANG CHIẾU
          </button>
          <button
            onClick={() => setFilter("sapChieu")}
            className={`px-4 py-2 rounded ${filter === "sapChieu" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            PHIM SẮP CHIẾU
          </button>
        </div>

        <div className="space-x-2">
          <button
            disabled={!canPrev}
            onClick={() =>
              setStartIndex((prev) => (prev - STEP_SIZE + filtered.length) % filtered.length)
            }
            className={`px-3 py-2 rounded ${canPrev ? "bg-gray-100" : "bg-gray-100 opacity-50 cursor-not-allowed"}`}
            aria-label="Prev"
          >
            ‹
          </button>
          <button
            disabled={!canNext}
            onClick={() =>
              setStartIndex((prev) => (prev + STEP_SIZE) % filtered.length)
            }
            className={`px-3 py-2 rounded ${canNext ? "bg-gray-100" : "bg-gray-100 opacity-50 cursor-not-allowed"}`}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {windowItems.slice(0, 4).map((movie) => (
          <Movie key={`row1-${movie.maPhim}`} movie={movie} />
        ))}
        {windowItems.slice(4, 8).map((movie) => (
          <Movie key={`row2-${movie.maPhim}`} movie={movie} />
        ))}
      </div>
    </div>
  );
}