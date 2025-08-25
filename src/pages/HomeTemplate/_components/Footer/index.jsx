
export default function Footer() {
  return (
      <footer className="bg-white dark:bg-gray-900 shadow mt-12">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-8">
              <div className="md:flex md:justify-between">
                  <div className="mb-6 md:mb-0">
                      <a href="/" className="flex items-center">
                          <img src="/images/logo.png" className="h-8 me-3" alt="Doge Movie Logo" />
                          <span className="self-center text-2xl font-bold whitespace-nowrap text-red-600 dark:text-red-500">Doge Movie</span>
                      </a>
                  </div>
                  <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                      <div>
                          <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">Liên hệ</h2>
                          <ul className="text-gray-500 dark:text-gray-400 text-sm">
                              <li className="mb-2">Email: support@dogemovie.app</li>
                              <li>Hotline: 1900 9999</li>
                          </ul>
                      </div>
                      <div>
                          <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">Hệ thống rạp</h2>
                          <ul className="text-gray-500 dark:text-gray-400 text-sm">
                              <li className="mb-2">CGV, BHD, Galaxy...</li>
                              <li>Đối tác thanh toán: Visa/Master, Momo</li>
                          </ul>
                      </div>
                      <div>
                          <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">Chính sách</h2>
                          <ul className="text-gray-500 dark:text-gray-400 text-sm">
                              <li className="mb-2"><a href="#" className="hover:underline">Bảo mật</a></li>
                              <li><a href="#" className="hover:underline">Điều khoản</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />
              <div className="sm:flex sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} Doge Movie. All rights reserved.</span>
                  <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4 text-gray-500">
                      <a href="#" aria-label="Facebook" className="hover:text-gray-900 dark:hover:text-white">FB</a>
                      <a href="#" aria-label="YouTube" className="hover:text-gray-900 dark:hover:text-white">YT</a>
                      <a href="#" aria-label="Instagram" className="hover:text-gray-900 dark:hover:text-white">IG</a>
                  </div>
              </div>
          </div>
      </footer>


  )
}
