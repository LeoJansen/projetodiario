import Image from "next/image";

export const Navbar = () => {

    return (
        <div className="w-full fixed top-0 left-0 bg-[#d1d5fd] shadow-md z-10 flex items-center justify-between p-4">
            <Image
            src="/assets/logbook.svg"
            width={60}
            height={60}
            alt="Logo"
            
            />
            Navbar
        </div>
    );
};