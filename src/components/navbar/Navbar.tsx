import { useState } from "react";
import logo from "../../assets/logo.png";
import { List } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const btnMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className='bg-orange-300 flex justify-center items-center shadow-md md:h-28 md:justify-between px-4'>
                <img src={logo} alt="logo do website Daylist" className="w-12 h-12 rounded-full border-2 border-white shadow-lg order-2 md:h-24 md:w-24" />
                <div className={`absolute left-3 top-3 flex flex-col md:relative md:order-2 md:top-0`}>
                    <button onClick={btnMenu} className="text-black md:hidden">
                        <List size={32} weight={`${isOpen ? "light" : "bold"}`} />
                    </button>
                    <ul className={`flex flex-col justify-between px-5 *:rounded-sm *:py-4 hover:*:underline  hover:*:text-white *:transition-all *:duration-300 transition-all duration-400 ease-in-out bg-orange-400 font-medium uppercase shadow-lg rounded-lg transform ${isOpen ? `h-auto opacity-100` : `h-0 opacity-0 pointer-events-none`}
                                    md:h-auto md:opacity-100 md:flex-row md:*:px-2 md:bg-transparent md:shadow-none md:text-2xl md:hover:*:shadow-md md:pointer-events-auto`}>
                        <Link to={"/tarefas"} onClick={closeMenu}>DayList</Link>
                        <Link to={"/perfil"} onClick={closeMenu}>Perfil</Link>
                        <Link to={"/login"} onClick={closeMenu}>Login</Link>
                        <Link to={"/cadastro"} onClick={closeMenu}>Cadastro</Link>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;
