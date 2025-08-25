import { useEffect, useMemo, useState } from "react";
import api from "../../../../service/api";
import { useNavigate } from "react-router-dom";


export default function Showtimes() {
  const navigate = useNavigate();
  const [heThongRap, setHeThongRap] = useState([]);
  const [maHeThongRap, setMaHeThongRap] = useState(null);

  const [cumRapTheoHeThong, setCumRapTheoHeThong] = useState([]);
  const [maCumRap, setMaCumRap] = useState(null);

  const [lichChieuHeThong, setLichChieuHeThong] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHeThong = async () => {
      try {
        const res = await api.get("QuanLyRap/LayThongTinHeThongRap");
        setHeThongRap(res.data.content || []);
        if (res.data.content?.length) {
          setMaHeThongRap(res.data.content[0].maHeThongRap);
        }
      } catch (e) {
        console.log("LayThongTinHeThongRap error:", e);
      }
    };
    fetchHeThong();
  }, []);


  useEffect(() => {
    if (!maHeThongRap) return;
    const fetchCumRap = async () => {
      try {
        const res = await api.get(
          `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
        );
        const list = res.data.content || [];
        setCumRapTheoHeThong(list);
        setMaCumRap(list[0]?.maCumRap || null);
      } catch (e) {
        console.log("LayThongTinCumRapTheoHeThong error:", e);
      }
    };
    fetchCumRap();
  }, [maHeThongRap]);


  useEffect(() => {
    const fetchLichChieuHeThong = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01"
        );
        setLichChieuHeThong(res.data.content || []);
      } catch (e) {
        console.log("LayThongTinLichChieuHeThongRap error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLichChieuHeThong();
  }, []);


  const moviesAtSelectedCluster = useMemo(() => {
    if (!maHeThongRap || !maCumRap) return [];
    const heThong = lichChieuHeThong.find(
      (h) => h.maHeThongRap === maHeThongRap
    );
    const cum = heThong?.lstCumRap?.find((c) => c.maCumRap === maCumRap);

    return cum?.danhSachPhim || [];
  }, [lichChieuHeThong, maHeThongRap, maCumRap]);

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Lịch chiếu</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Cột 1: Hệ thống rạp */}
        <div className="md:col-span-3">
          <div className="space-y-2">
            {heThongRap.map((item) => (
              <button
                key={item.maHeThongRap}
                onClick={() => setMaHeThongRap(item.maHeThongRap)}
                className={`w-full flex items-center gap-3 p-3 rounded border ${maHeThongRap === item.maHeThongRap
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <img src={item.logo} alt={item.tenHeThongRap} className="w-8 h-8 object-contain" />
                <span className="text-sm text-left">{item.tenHeThongRap}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cột 2: Cụm rạp theo hệ thống */}
        <div className="md:col-span-4">
          <div className="space-y-2 max-h-[520px] overflow-auto pr-2">
            {cumRapTheoHeThong.map((cum) => (
              <button
                key={cum.maCumRap}
                onClick={() => setMaCumRap(cum.maCumRap)}
                className={`w-full text-left p-3 rounded border ${maCumRap === cum.maCumRap
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

        {/* Cột 3: Lịch chiếu theo cụm đã chọn */}
        <div className="md:col-span-5">
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <div className="space-y-6 max-h-[520px] overflow-auto pr-2">
              {moviesAtSelectedCluster.map((mv) => (
                <div key={mv.maPhim} className="border-b pb-4">
                  <div className="flex gap-4">
                    <img
                      src={mv.hinhAnh}
                      alt={mv.tenPhim}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{mv.tenPhim}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {mv.lstLichChieuTheoPhim?.slice(0, 12).map((lc) => (
                          <span
                            key={lc.maLichChieu}
                            onClick={() => navigate(`/rap-chieu-phim/${lc.maLichChieu}`)}
                            className="px-3 py-1 text-green-600 border border-green-500 rounded text-sm cursor-pointer hover:bg-green-50"
                          >
                            {formatTime(lc.ngayChieuGioChieu)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {!moviesAtSelectedCluster.length && (
                <p className="text-gray-500">Chưa có lịch chiếu cho cụm này.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}