import { useState } from "react";
import api from "./../../../service/api";
import { useNavigate, Navigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOnChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // Xử lý submit form, post api
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      const response = await api.post("QuanLyNguoiDung/DangNhap", values);
      const user = response.data.content;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.maLoaiNguoiDung === "QuanTri") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.content || "Đăng nhập thất bại. Vui lòng kiểm tra tài khoản/mật khẩu.";
      setErrorMsg(typeof msg === "string" ? msg : "Đăng nhập thất bại.");
    }
    finally { setLoading(false); }
  };

  // useEffect (() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if(user && user.maLoaiNguoiDung === "QuanTri"){
  //     return <navigate to="/admin/dashboard" />
  //   }
  //   if(user && user.maLoaiNguoiDung !== "QuanTri"){
  //     return <navigate to="/" />
  //   }
  // }
  // ,[]);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.maLoaiNguoiDung === "QuanTri") {
    return <Navigate to="/admin" replace />;
  }
  if (user && user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" replace />;
  }

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
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Đăng nhập</h1>
        {errorMsg && <div className="mb-3 text-red-600 text-sm">{errorMsg}</div>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            placeholder="Tài khoản"
            className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            name="taiKhoan"
            onChange={handleOnChange}
            value={values.taiKhoan}
          />
          <input
            placeholder="Mật khẩu"
            type="password"
            className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            name="matKhau"
            onChange={handleOnChange}
            value={values.matKhau}
          />
          <button disabled={loading} className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-200 disabled:opacity-60">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          {/* <button type="button" onClick={handleTestApi} className="w-full p-3 border rounded-lg">
            Test API LayDanhSachNguoiDung
          </button> */}
        </form>
        <p className="text-center text-sm mt-4">
           Chưa có tài khoản? <button onClick={() => navigate("/dang-ky")} className="text-green-700 underline">Đăng ký ngay!</button>
          </p>
      </div>
    </div>
    </div>
  )
}