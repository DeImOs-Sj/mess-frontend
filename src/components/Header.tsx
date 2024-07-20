import SinhgadLogo from "../assets/header/sinhgad.png";

export default function Header() {
    return (
        <nav className="bg-[#003399] flex flex-col items-center h-[150px]">
            <div className="flex justify-center w-full h-full">
                <img className='block h-[150px] px-20 py-8 mr-[20px]' src={SinhgadLogo} alt="Logo" />
                <div className='flex items-center h-full'>
                    <p className="text-2xl text-white text-center font-bold">Sinhgad Technical Education Society's<br />Mess Feedback System</p>
                </div>

            </div>

        </nav>
    )
}