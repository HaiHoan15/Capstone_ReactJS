import { useState } from "react";
import api from "../../../service/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
    confirmMatKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (values.matKhau !== values.confirmMatKhau) {
      setErrorMsg("Mật khẩu và Nhập lại mật khẩu không khớp.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        email: values.email,
        soDt: values.soDt,
        hoTen: values.hoTen,
        maNhom: "GP01",
      };
      await api.post("QuanLyNguoiDung/DangKy", payload);
      setSuccessMsg("Đăng ký thành công!");
      setTimeout(() => navigate("/dang-nhap"), 1000);
    } catch (err) {
      const msg = err?.response?.data?.content || "Đăng ký thất bại. Vui lòng thử lại.";
      setErrorMsg(typeof msg === "string" ? msg : "Đăng ký thất bại.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Đăng ký</h1>

          {errorMsg && <div className="mb-4 text-red-600 text-sm">{errorMsg}</div>}
          {successMsg && <div className="mb-4 text-green-600 text-sm">{successMsg}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="taiKhoan"
              placeholder="Tài khoản"
              className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              value={values.taiKhoan}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="matKhau"
              placeholder="Mật khẩu"
              className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              value={values.matKhau}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmMatKhau"
              placeholder="Nhập lại mật khẩu"
              className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              value={values.confirmMatKhau}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              value={values.email}
              onChange={handleChange}
              required
            />
            <input
              name="soDt"
              placeholder="Số điện thoại"
              className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              value={values.soDt}
              onChange={handleChange}
              required
            />
            <input
              name="hoTen"
              placeholder="Họ tên"
              className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              value={values.hoTen}
              onChange={handleChange}
              required
            />

            <button
              disabled={loading}
              className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-200 disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Đã có tài khoản? <button onClick={() => navigate("/dang-nhap")} className="text-green-700 underline">Đăng nhập</button>
          </p>
        </div>
      </div>
    </div>
  );
}