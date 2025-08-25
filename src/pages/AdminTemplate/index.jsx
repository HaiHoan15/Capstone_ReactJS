import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";

export default function AdminTemplate() {
    const user = (() => {
        try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
    })();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/dang-nhap" replace />;
    }
    if (user.maLoaiNguoiDung !== "QuanTri") {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">Không có quyền truy cập</h1>
                <p className="mb-4">Tài khoản hiện tại không phải Admin. Vui lòng đăng nhập bằng tài khoản quản trị.</p>
                <button onClick={() => navigate("/", { replace: true })} className="px-4 py-2 rounded border">Về trang chủ</button>
            </div>
        );
    }
    const navItemClass = ({ isActive }) =>
        `block px-3 py-2 rounded-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-blue-50"}`;

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/dang-nhap", { replace: true });
    };

    return (
        <div className="min-h-screen grid grid-cols-12">
            {/* Sidebar */}
            <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r p-4 space-y-4">
                <div>
                    <h2 className="text-lg font-bold mb-2">{user?.taiKhoan}</h2>
                    <nav className="space-y-1">
                        {/* <button onClick={() => navigate("/admin/thong-tin")}
                            className="block w-full text-left px-3 py-2 rounded-sm text-gray-800 hover:bg-blue-50">
                            Thông tin tài khoản
                        </button> */}
                        <NavLink to="/admin/thong-tin" className={navItemClass}>Thông tin tài khoản</NavLink>
                        <NavLink to="/admin/quan-ly-user" className={navItemClass}>Quản lý user</NavLink>
                        <NavLink to="/admin/quan-ly-phim" className={navItemClass}>Quản lý phim</NavLink>
                        <NavLink to="/admin/quan-ly-showtime" className={navItemClass}>Quản lý showtime</NavLink>
                        <button onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 rounded-sm text-red-600 hover:bg-red-50">
                            Đăng xuất
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Content */}
            <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4">
                <Outlet />
            </main>
        </div>
    );
}