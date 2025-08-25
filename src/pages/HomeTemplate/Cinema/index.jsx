import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import api from "../../../service/api";

export default function CinemaPage() {
  const { maLichChieu } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);       
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);  
  const [secondsLeft, setSecondsLeft] = useState(300); 
  const [booking, setBooking] = useState({ submitting: false, error: "", success: "" });

  // 1) Load danh sách ghế + thông tin phim
  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const res = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
        setRoom(res.data.content);
      } catch (e) {
        console.log("LayDanhSachPhongVe error:", e);
      } finally {
        setLoading(false);
      }
    };
    if (maLichChieu) fetchRoom();
  }, [maLichChieu]);

  // 2) Đếm ngược giữ ghế
  useEffect(() => {
    if (!room) return;
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [room, secondsLeft]);

  // 3) Chọn/bỏ chọn ghế
  const toggleSeat = (ghe) => {
    if (ghe.daDat) return;                         // ghế đã đặt không cho chọn
    if (secondsLeft <= 0) return;
    setSelected((prev) => {
      const exists = prev.find((x) => x.maGhe === ghe.maGhe);
      if (exists) return prev.filter((x) => x.maGhe !== ghe.maGhe);
      return [...prev, ghe];
    });
  };

  // 4) Tính tổng tiền
  const total = useMemo(
    () => selected.reduce((sum, g) => sum + (g.giaVe || 0), 0),
    [selected]
  );

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  // Format ngày an toàn, tránh Invalid Date
  const safeFormatNgay = (raw) => {
    if (!raw) return "";
    try {
      const d1 = parseISO(String(raw));
      if (!isNaN(d1)) return format(d1, "dd/MM/yyyy");
    } catch (e) { void e; }
    try {
      const d2 = new Date(raw);
      if (!isNaN(d2)) return format(d2, "dd/MM/yyyy");
    } catch (e) { void e; }
    return String(raw);
  };

  if (loading) return <div className="container mx-auto p-6">Đang tải...</div>;
  if (!room) return <div className="container mx-auto p-6">Không có dữ liệu phòng vé.</div>;

  const info = room.thongTinPhim; 

  const perRow = 16;
  const rows = [];
  for (let i = 0; i < room.danhSachGhe.length; i += perRow) {
    rows.push(room.danhSachGhe.slice(i, i + perRow));
  }

  return (
    <div className="container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Khu chọn ghế */}
      <div className="lg:col-span-8">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">
            {info.tenPhim} • {info.tenCumRap} • {info.tenRap}
          </div>
          <div className="font-semibold">
            Thời gian giữ ghế: <span className={secondsLeft <= 30 ? "text-red-600" : "text-orange-500"}>{mm}:{ss}</span>
          </div>
        </div>

        <div className="w-full h-2 rounded bg-gray-200 mb-6" />
        <p className="text-center text-sm text-gray-500 mb-6">Màn hình</p>

        <div className="space-y-2">
          {rows.map((row, idx) => (
            <div key={idx} className="flex items-center gap-2 justify-center">
              {row.map((g) => {
                const isSelected = !!selected.find((x) => x.maGhe === g.maGhe);
                const base = "w-7 h-7 rounded-sm text-[10px] flex items-center justify-center select-none";
                const color =
                  g.daDat
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : isSelected
                      ? "bg-green-500 text-white"
                      : g.loaiGhe === "Vip"
                        ? "bg-orange-400 text-white hover:brightness-95"
                        : "bg-gray-200 hover:bg-gray-300";
                return (
                  <button
                    key={g.maGhe}
                    className={`${base} ${color}`}
                    onClick={() => toggleSeat(g)}
                    title={`${g.tenGhe} - ${g.loaiGhe} - ${g.giaVe?.toLocaleString()}đ`}
                  >
                    {g.tenGhe}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Chú thích */}
        <div className="flex items-center gap-4 mt-6 text-sm">
          <Legend color="bg-gray-200" text="Ghế thường" />
          <Legend color="bg-orange-400 text-white" text="Ghế VIP" />
          <Legend color="bg-green-500 text-white" text="Ghế đang chọn" />
          <Legend color="bg-gray-400 text-white" text="Ghế đã đặt" />
        </div>
      </div>

      {/* Thông tin/Thanh toán */}
      <div className="lg:col-span-4">
        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center gap-3">
            <img src={info.hinhAnh} alt={info.tenPhim} className="w-16 h-20 object-cover rounded" />
            <div>
              <p className="font-semibold">{info.tenPhim}</p>
              <p className="text-sm text-gray-500">
                {safeFormatNgay(info.ngayChieu)} {info.gioChieu ? `• ${info.gioChieu}` : ""}
              </p>
              <p className="text-sm text-gray-500">{info.tenCumRap} - {info.tenRap}</p>
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-sm font-semibold mb-2">Ghế chọn:</p>
            <div className="flex flex-wrap gap-2">
              {selected.length
                ? selected.map((g) => (
                    <span key={g.maGhe} className="px-2 py-1 rounded bg-green-50 text-green-700 border border-green-300 text-xs">
                      {g.tenGhe} - {(g.giaVe || 0).toLocaleString()}đ
                    </span>
                  ))
                : <span className="text-sm text-gray-500">Chưa chọn ghế</span>}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <span className="font-semibold">Tổng tiền</span>
            <span className="text-lg font-bold text-orange-600">{total.toLocaleString()}đ</span>
          </div>

          {booking.error && <p className="text-red-600 text-sm">{booking.error}</p>}
          {booking.success && <p className="text-green-600 text-sm">{booking.success}</p>}
          <button
            disabled={!selected.length || secondsLeft <= 0 || booking.submitting}
            className={`w-full mt-2 py-3 rounded text-white ${selected.length && secondsLeft > 0 ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-300 cursor-not-allowed"}`}
            onClick={async () => {
              const me = (() => { try { return JSON.parse(localStorage.getItem("user")); } catch { return null; } })();
              if (!me) { navigate("/dang-nhap", { replace: true }); return; }
              try {
                setBooking({ submitting: true, error: "", success: "" });
                const payload = {
                  maLichChieu: Number(maLichChieu),
                  danhSachVe: selected.map((g) => ({ maGhe: g.maGhe, giaVe: g.giaVe })),
                  taiKhoan: me.taiKhoan,
                };
                await api.post("QuanLyDatVe/DatVe", payload, {
                  headers: me.accessToken ? { Authorization: `Bearer ${me.accessToken}` } : undefined,
                });
                setBooking({ submitting: false, error: "", success: "Đặt vé thành công!" });
                // Sau 1.2s điều hướng về lịch sử đặt vé
                setTimeout(() => navigate("/tai-khoan"), 1200);
              } catch (err) {
                const msg = err?.response?.data?.content || err?.message || "Đặt vé thất bại";
                setBooking({ submitting: false, error: typeof msg === "string" ? msg : "Đặt vé thất bại", success: "" });
              }
            }}
          >
            {booking.submitting ? "Đang đặt vé..." : "BOOKING TICKET"}
          </button>

          <button
            className="w-full mt-2 py-2 rounded border"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded-sm inline-block ${color}`} />
      <span>{text}</span>
    </div>
  );
}