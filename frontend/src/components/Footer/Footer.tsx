const Footer = () => {
    return (
        <div>
            <footer className="bg-[#1f2937] text-white pt-8 pb-4 mt-10">
                <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm container">

                    {/* Cột 1 - Giới thiệu */}
                    <div>
                        <h3 className="text-base font-semibold mb-2">Về trang web</h3>
                        <p>
                            Website ôn thi bằng lái xe máy hạng A1 cung cấp tài liệu chính thức,
                            thi thử, mẹo làm bài và mẹo tránh câu điểm liệt – giúp bạn vượt qua kỳ thi dễ dàng.
                        </p>
                    </div>

                    {/* Cột 2 - Điều hướng */}
                    <div>
                        <h3 className="text-base font-semibold mb-2">Liên kết nhanh</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Trang chủ</a></li>
                            <li><a href="#" className="hover:underline">Tin tức</a></li>
                            <li><a href="#" className="hover:underline">Liên hệ</a></li>
                            <li><a href="#" className="hover:underline">Thi thử</a></li>
                        </ul>
                    </div>

                    {/* Cột 3 - Liên hệ */}
                    <div>
                        <h3 className="text-base font-semibold mb-2">Liên hệ</h3>
                        <p>Email: <a href="mailto:hotro@onthia1.vn" className="hover:underline">hotro@onthia1.vn</a></p>
                        <p>Zalo: 0987 654 321</p>
                        <p>Facebook: <a href="#" className="hover:underline">fb.com/onthia1</a></p>
                    </div>

                </div>

                <div className="text-center mt-6 text-xs text-gray-400 border-t border-gray-700 pt-4">
                    © {new Date().getFullYear()} Ôn thi A1 - All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Footer;