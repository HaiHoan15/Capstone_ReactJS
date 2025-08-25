import { useEffect, useState, useRef } from "react";
import api from "../../../../service/api";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get("/QuanLyPhim/LayDanhSachBanner");
        setBanners(response.data.content || []);
      } catch (error) {
        console.log("fetchBanners error:", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!banners.length) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000); // 3 giây

    return () => clearInterval(timerRef.current);
  }, [banners]);

  if (!banners.length) {
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
        Đang tải banner...
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-[380px] md:h-[460px]">
        {banners.map((item, index) => (
          <img
            key={item.maBanner || index}
            src={item.hinhAnh}
            alt={item.maBanner}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-2">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}