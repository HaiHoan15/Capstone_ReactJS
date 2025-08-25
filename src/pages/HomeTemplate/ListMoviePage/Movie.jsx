import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Movie({ movie }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const user = (() => {
      try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
    })();

    if (!user) {
      navigate("/dang-nhap", { replace: true });
      return;
    }
    navigate("/chi-tiet-phim/" + movie.maPhim);
  };

 
  const styles = useMemo(() => {
    const cardH = 360; 
    return {
      card: { position: "relative", width: "100%", height: cardH, perspective: "1000px", borderRadius: 8 },
      inner: { position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform .6s" },
      face: {
        position: "absolute", inset: 0, width: "100%", height: "100%",
        backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
        overflow: "hidden", borderRadius: 8, boxShadow: "0 8px 14px rgba(0,0,0,.15)"
      },
      back: { transform: "rotateY(180deg)", background: "#111827", color: "#fff", display: "flex", alignItems: "center" },
      img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
      backBody: { padding: 16, display: "grid", gap: 12 },
    };
  }, []);

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.firstChild.style.transform = "rotateY(180deg)")}
      onMouseLeave={(e) => (e.currentTarget.firstChild.style.transform = "rotateY(0deg)")}
      onClick={handleCardClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCardClick()}
    >
      <div style={styles.inner}>
        {/* Mặt trước: chỉ hình */}
        <div style={styles.face}>
          <img style={styles.img} src={movie.hinhAnh} alt={movie.tenPhim} draggable={false} />
        </div>

        {/* Mặt sau: tên + mô tả ngắn */}
        <div style={{ ...styles.face, ...styles.back }}>
          <div style={styles.backBody}>
            <h5 className="text-xl font-bold">{movie.tenPhim}</h5>
            <p className="text-sm opacity-90">{movie.moTa?.slice(0, 160)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
}