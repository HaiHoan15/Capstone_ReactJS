export default function AdminInformation() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  if (!user) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Thông tin tài khoản</h1>
        <p className="text-red-600">Không tìm thấy thông tin người dùng.</p>
      </div>
    );
  }

  const hiddenKeys = new Set(["matKhau", "matkhau", "maNhom", "manhom", "accessToken", "token", "access_token"]);
  const entries = Object.entries(user).filter(([key]) => !hiddenKeys.has(key));
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Thông tin tài khoản</h1>
      <div className="max-w-xl overflow-hidden rounded border">
        <table className="w-full text-sm">
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key} className="border-b last:border-0">
                <td className="w-1/3 p-3 font-medium capitalize">
                  {key}
                </td>
                <td className="p-3 break-words">
                  {String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


