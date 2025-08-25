import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./../../../service/api";

export default function MovieDetailsPage() {
  const { MaPhim } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState(null);
  const [loading, setLoading] = useState(true);

  // Chọn hệ thống/cụm rạp giống HomePage
  const [maHeThongRap, setMaHeThongRap] = useState(null);
  const [maCumRap, setMaCumRap] = useState(null);

  useEffect(() => {
    if (!MaPhim) return;
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Thông tin chi tiết phim
        const resMovie = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${MaPhim}`);
        setMovie(resMovie.data.content);

        // Lịch chiếu theo phim
        const resShow = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${MaPhim}`);
        const content = resShow.data.content;
        setShowtimes(content);

        // Set mặc định hệ thống & cụm rạp đầu tiên
        const firstHT = content?.heThongRapChieu?.[0];
        setMaHeThongRap(firstHT?.maHeThongRap || null);
        setMaCumRap(firstHT?.cumRapChieu?.[0]?.maCumRap || null);
      } catch (err) {
        console.log("MovieDetailsPage fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [MaPhim]);

  // Danh sách cụm rạp theo hệ thống đang chọn
  const cumRapTheoHeThong = useMemo(() => {
    if (!maHeThongRap) return [];
    const ht = showtimes?.heThongRapChieu?.find(h => h.maHeThongRap === maHeThongRap);
    return ht?.cumRapChieu || [];
  }, [showtimes, maHeThongRap]);

  // Lịch chiếu (giờ) của phim ở cụm rạp đang chọn
  const lichChieuTheoCum = useMemo(() => {
    if (!maHeThongRap || !maCumRap) return [];
    const ht = showtimes?.heThongRapChieu?.find(h => h.maHeThongRap === maHeThongRap);
    const cum = ht?.cumRapChieu?.find(c => c.maCumRap === maCumRap);
    return cum?.lichChieuPhim || [];
  }, [showtimes, maHeThongRap, maCumRap]);

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

  const ngayKhoiChieu =
    movie?.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy") : "";

  if (loading) return <div className="container mx-auto p-6">Đang tải...</div>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Thông tin phim */}
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 md:col-span-2">
          <img
            src={movie?.hinhAnh}
            className="w-full h-72 object-cover rounded-md shadow"
            alt={movie?.biDanh}
          />
        </div>
        <div className="col-span-6 md:col-span-4 space-y-3">
          <h1 className="text-3xl font-bold">{movie?.tenPhim}</h1>
          <p className="text-gray-700">{movie?.moTa}</p>
          <p className="text-sm text-gray-500">Ngày khởi chiếu: {ngayKhoiChieu}</p>

          <div className="flex gap-3 pt-2">
            <button className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700">
              ĐẶT VÉ
            </button>
            <button className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700">
              XEM TRAILER
            </button>
          </div>
        </div>
      </div>

      {/* Lịch chiếu 3 cột giống HomePage */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Lịch chiếu</h2>

        {!showtimes?.heThongRapChieu?.length ? (
          <p className="text-gray-500">Chưa có lịch chiếu cho phim này.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Cột 1: Hệ thống rạp */}
            <div className="md:col-span-3">
              <div className="space-y-2">
                {showtimes.heThongRapChieu.map((ht) => (
                  <button
                    key={ht.maHeThongRap}
                    onClick={() => {
                      setMaHeThongRap(ht.maHeThongRap);
                      setMaCumRap(ht.cumRapChieu?.[0]?.maCumRap || null);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded border ${
                      maHeThongRap === ht.maHeThongRap
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <img src={ht.logo} alt={ht.tenHeThongRap} className="w-8 h-8 object-contain" />
                    <span className="text-sm text-left">{ht.tenHeThongRap}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cột 2: Cụm rạp */}
            <div className="md:col-span-4">
              <div className="space-y-2 max-h-[520px] overflow-auto pr-2">
                {cumRapTheoHeThong.map((cum) => (
                  <button
                    key={cum.maCumRap}
                    onClick={() => setMaCumRap(cum.maCumRap)}
                    className={`w-full text-left p-3 rounded border ${
                      maCumRap === cum.maCumRap
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-semibold">{cum.tenCumRap}</p>
                    <p className="text-xs text-gray-500">{cum.diaChi}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cột 3: Giờ chiếu của phim ở cụm đã chọn */}
            <div className="md:col-span-5">
              <div className="space-y-4 max-h-[520px] overflow-auto pr-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {lichChieuTheoCum.map((lc) => (
                    <span
                      key={lc.maLichChieu}
                      onClick={() => navigate(`/rap-chieu-phim/${lc.maLichChieu}`)}
                      className="px-3 py-1 text-green-600 border border-green-500 rounded text-sm cursor-pointer hover:bg-green-50"
                    >
                      {formatTime(lc.ngayChieuGioChieu)}
                    </span>
                  ))}
                </div>
                {!lichChieuTheoCum.length && (
                  <p className="text-gray-500">Chưa có lịch chiếu cho cụm rạp này.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}