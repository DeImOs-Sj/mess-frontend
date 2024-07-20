import SinhgadLogo from "../assets/header/sinhgad.png";

export default function Header() {
    return (
        <nav className="bg-[#003399] flex flex-col items-center md:h-[150px] h-[250px] p-5">
            <div className="flex md:flex-row flex-col justify-center items-center w-full h-full">
                <img className='block w-[300px] px-20 py-8' src={SinhgadLogo} alt="Logo" />
                <div className='flex items-center h-full'>
                    <p className="lg:text-2xl sm:text-sm text-white text-center font-bold">Sinhgad Technical Education Society's<br />Mess Feedback System</p>
                </div>
            </div>
        </nav>
    )
}