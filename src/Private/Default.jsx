import { Link, Outlet } from "react-router-dom"
import logo from "../Assets/images/amazon-logo-transparent-high-resolution.png"
export const Default = () => {
    return(
        <>
        <div className="d-flex align-items-center justify-content-around">
            <img style={{marginTop:"100px"}} width={290} height={320} src={logo} alt="img" />
            <h1 style={{position:"relative", right:"170px"}} className=" default text-dark"><Link className="text-dark text-decoration-none" to={"rated-tv"}>Movie <span className="text-success"> App</span> </Link> </h1>
        </div>
            <Outlet/>
        </>
    )
}