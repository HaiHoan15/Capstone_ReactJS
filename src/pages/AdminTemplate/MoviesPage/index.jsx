import { useEffect, useMemo, useState } from "react";
import api from "../../../service/api";
const GROUP_CODE = "GP01";
import { useNavigate } from "react-router-dom";

export default function MoviesPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}`);
        setMovies(res.data.content || []);
      } catch (e) {
        const msg = e?.response?.data?.content || "Không tải được danh sách phim";
        setError(typeof msg === "string" ? msg : "Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return movies;
    const q = search.toLowerCase();
    return movies.filter(
      (m) => m.tenPhim?.toLowerCase().includes(q) || String(m.maPhim).includes(q)
    );
  }, [movies, search]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý Phim</h1>
        <button
          className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => navigate("/admin/them-phim")}
        >
          Thêm phim
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm theo tên hoặc mã phim"
        className="w-full mb-4 p-2 border rounded"
      />

      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Mã phim</th>
                <th className="p-2 text-left">Hình ảnh</th>
                <th className="p-2 text-left">Tên phim</th>
                <th className="p-2 text-left">Mô tả</th>
                <th className="p-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.maPhim} className="border-t">
                  <td className="p-2">{m.maPhim}</td>
                  <td className="p-2">
                    <img src={m.hinhAnh} alt={m.tenPhim} className="w-12 h-16 object-cover rounded" />
                  </td>
                  <td className="p-2">{m.tenPhim}</td>
                  <td className="p-2">{m.moTa?.slice(0, 80)}{m.moTa && m.moTa.length > 80 ? "..." : ""}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 rounded border hover:bg-gray-50"
                        onClick={() => alert("Chức năng sửa sẽ bổ sung sau")}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-2 py-1 rounded border hover:bg-gray-50"
                        onClick={() => alert("Chức năng xóa sẽ bổ sung sau")}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


