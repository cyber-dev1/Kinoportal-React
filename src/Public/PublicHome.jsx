import { Link, NavLink, Outlet } from "react-router-dom"
import "../App.css"
export const PublicHome = () => {
    return(
        <>
            <header style={{background:"#d8d8d8"}} className="py-3">
                <div className="container">
                    <div className="box d-flex align-items-center justify-content-between">
                        <Link className="text-black text-decoration-none"><h1>Movie  <span className="text-success">App</span></h1></Link>
                        <ul className="list-unstyled d-flex align-items-center justify-content-around w-50">
                            <li>
                                <NavLink className={(params) => params?.isActive? "text-decoration-underline text-dark" : "text-decoration-none text-dark"} to={"kinoportal-haqida"}>Kinoportal Haqida</NavLink>
                            </li>
                            <li>
                                <NavLink className={(params) => params?.isActive? "text-decoration-underline text-dark" : "text-decoration-none text-dark"}to={"register"}>Ruyhatdan Utish</NavLink>
                            </li>
                            <li>
                                <NavLink className={(params) => params?.isActive? "text-decoration-underline text-dark" : "text-decoration-none text-dark"} to={"login"}>Login Orqali Kirish</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <Outlet/>
        </>
    )
}