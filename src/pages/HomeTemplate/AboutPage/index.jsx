export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          🎬 Giới thiệu về <span className="text-red-600">Doge Movie</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
          <span className="font-semibold">Doge Movie</span> là nền tảng đặt vé xem phim trực tuyến 
          giúp bạn dễ dàng theo dõi lịch chiếu, đặt vé nhanh chóng và trải nghiệm điện ảnh tiện lợi 
          hơn bao giờ hết. Với giao diện thân thiện, tốc độ mượt mà và hệ thống bảo mật an toàn, 
          chúng tôi mong muốn mang đến cho bạn những phút giây giải trí tuyệt vời cùng gia đình và bạn bè.
        </p>

        {/* 3 cột tính năng */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📅 Lịch chiếu đa dạng</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cập nhật liên tục các suất chiếu mới nhất từ nhiều cụm rạp lớn trên toàn quốc.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">⚡ Đặt vé siêu nhanh</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Chỉ với vài cú nhấp chuột, bạn đã có ngay tấm vé trong tay mà không cần xếp hàng.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🔒 Thanh toán an toàn</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Hỗ trợ nhiều phương thức thanh toán bảo mật, nhanh chóng và tiện lợi.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16">
          <a
            href="/danh-sach-phim"
            className="px-8 py-3 text-lg font-medium text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition"
          >
            Bắt đầu đặt vé ngay 🎟️
          </a>
        </div>
      </div>
    </div>
  );
}
