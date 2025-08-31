import { useEffect, useState } from "react";
import { profileApi } from "../../api/api";

interface ProfileProps {
    setProfilePopup: (isOpen: boolean) => void;
}

interface Profile {
    email: string;
    fullName: string;
    imageName: string;
}

const Profile: React.FC<ProfileProps> = ({ setProfilePopup }) => {
    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('imageName');
        localStorage.removeItem('email');
        localStorage.removeItem('role');

        window.location.href = '/';
    };

    const loadProfile = async () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail !== null) {
            const { data } = await profileApi.getProfile(userEmail);
            setProfile(data);
        }
    };

    const [profile, setProfile] = useState<Profile>({
        email: "",
        fullName: "",
        imageName: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);


    return (
        <div>
            <section className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-sm shadow md:mt-0 sm:max-w-md p-4">
                        <div className="flex justify-between items-center pb-3 mb-4 rounded-t border-b sm:mb-5">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hồ sơ</h3>
                            <button onClick={() => setProfilePopup(false)}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="grid gap-4 mb-4">
                            <div className="flex flex-col items-center justify-center space-y-1">
                                <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Ảnh Đại Diện</label>

                                <div className="mt-1 w-fit inline-block relative">
                                    <img src={
                                        typeof profile.imageName === 'string'
                                            ? profile.imageName.startsWith('data:image') ||
                                                profile.imageName.startsWith('blob:') ||
                                                profile.imageName.startsWith('https')
                                                ? profile.imageName
                                                : import.meta.env.VITE_API_URL_AVATAR_IMG + profile.imageName
                                            : '/path/to/default-image.jpg'
                                    }

                                        className="w-24 h-24 object-cover shadow border rounded-full" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <label htmlFor="email" className="font-medium text-gray-900">Email: </label>
                                <span>{profile.email}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <label htmlFor="name" className="font-medium text-gray-900">Họ và tên: </label>
                                <span>{profile.fullName}</span>
                            </div>

                            <div className="flex justify-center">
                                <div className="flex items-center space-x-4 justify-end mt-4">
                                    <button onClick={() => handleLogout()}
                                        className="bg-red-500 hover:bg-red-600 text-white border border-red-600 font-normal rounded-sm text-base px-3 py-2">
                                        <span className='ms-2'>Đăng Xuất</span>
                                    </button>
                                    {(
                                        localStorage.getItem("role") === "1"
                                    ) && (
                                            <a href="/quan-li"
                                                className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 hover:border-blue-600 font-normal rounded-sm text-base px-3 py-2">
                                                Quản lí
                                            </a>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </section>
        </div>
    );
}

export default Profile;