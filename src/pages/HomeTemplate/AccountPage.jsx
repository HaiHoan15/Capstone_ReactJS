import { useEffect, useState, useMemo } from "react";
import api from "../../service/api";
import { Navigate } from "react-router-dom";

export default function AccountPage() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });
  const [form, setForm] = useState(() => ({
    taiKhoan: user?.taiKhoan || "",
    matKhau: "",
    email: user?.email || "",
    soDT: user?.soDT || user?.soDt || "",
    hoTen: user?.hoTen || "",
    maNhom: user?.maNhom || "GP01",
  }));
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [info, setInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  if (!user) {
    return <Navigate to="/dang-nhap" replace />;
  }

  useEffect(() => {
    const fetchInfo = async () => {
      setLoadingInfo(true);
      try {
        const res = await api.post("QuanLyNguoiDung/ThongTinTaiKhoan");
        setInfo(res.data?.content || null);
      } catch (e) {
        setInfo(null);
      } finally {
        setLoadingInfo(false);
      }
    }
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveMsg("");
    setSaving(true);
    try {
      const payload = {
        taiKhoan: form.taiKhoan,
        matKhau: form.matKhau || user.matKhau || "string",
        email: form.email,
        soDT: form.soDT,
        hoTen: form.hoTen,
        maNhom: form.maNhom || "GP01",
      };
      await api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);
      const updated = { ...user, ...payload };
      delete updated.matKhau;
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setSaveMsg("Cập nhật thành công!");
    } catch (err) {
      const msg = err?.response?.data?.content || "Cập nhật thất bại";
      setSaveMsg(typeof msg === "string" ? msg : "Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  const bookings = useMemo(() => {
    const ds = info?.thongTinDatVe || [];
    return ds.slice().sort((a,b) => new Date(b.ngayDat) - new Date(a.ngayDat));
  }, [info]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4">
        <div className="border rounded p-4 space-y-3">
          <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
          {saveMsg && <p className="text-sm {saveMsg.includes('thành công') ? 'text-green-600' : 'text-red-600'}">{saveMsg}</p>}
          <form className="space-y-3" onSubmit={handleSave}>
            <input name="taiKhoan" value={form.taiKhoan} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Tài khoản" disabled />
            <input name="matKhau" type="password" value={form.matKhau} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Mật khẩu (để trống nếu không đổi)" />
            <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Email" />
            <input name="soDT" value={form.soDT} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Số điện thoại" />
            <input name="hoTen" value={form.hoTen} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Họ tên" />
            <button disabled={saving} className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-60">
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-3">Lịch sử đặt vé</h2>
          {loadingInfo ? (
            <p>Đang tải...</p>
          ) : !bookings.length ? (
            <p className="text-gray-600">Chưa có lịch sử đặt vé.</p>
          ) : (
            <div className="space-y-3 max-h-[520px] overflow-auto pr-2">
              {bookings.map((b, idx) => (
                <div key={idx} className="border rounded p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{b.tenPhim}</p>
                    <span className="text-sm text-gray-500">{new Date(b.ngayDat).toLocaleString("vi-VN")}</span>
                  </div>
                  <p className="text-sm text-gray-600">{b.danhSachGhe?.[0]?.tenHeThongRap} - {b.danhSachGhe?.[0]?.tenRap}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {b.danhSachGhe?.map((g) => (
                      <span key={g.maGhe} className="px-2 py-1 rounded bg-gray-100 text-gray-700 border text-xs">
                        Ghế {g.tenGhe}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


