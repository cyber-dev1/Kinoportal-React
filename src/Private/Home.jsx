import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { Context } from "../Settings/Context/Context"
import { Dropdown, Input, } from "antd"
import {SearchOutlined, MenuOutlined , LogoutOutlined, MessageOutlined} from "@ant-design/icons"
export const Home = () => {
    const dialogRef = useRef()
    const navigator = useNavigate()
    const { setToken} = useContext(Context)
    const { user, setName } = useContext(Context)
    const items = [
        {
            label: <NavLink className={(params) => params?.isActive ? "text-decoration-underline" : "text-decoration-none"} to={"rated-tv"}>Popular </NavLink>
        },
        {
            label: <NavLink className={(params) => params?.isActive ? "text-decoration-underline" : "text-decoration-none"} to={"rated-movies"}>Reyting</NavLink>
        },
        {
            label: <NavLink className={(params) => params?.isActive ? "text-decoration-underline" : "text-decoration-none"} to={"rated-episode"}>Teatrlarda</NavLink>
        }
    ]
    const handleChange = (event) => {
            if(event.target.value.length >= 1){
                navigator("search")
                setName(event.target.value)
            }else{
                navigator("/rated-tv")
            }
    }
    const handleLogOut = () => {
        navigator("public")
    }
    return (
        <>
            <header className="py-3 " style={{ background: "#14153a" }}>
                <div className="container">
                    <div className="box d-flex align-items-center justify-content-between">
                        <h1><Link className="text-light text-decoration-none" >Movie <span className="text-success">App</span></Link></h1>
                        <div style={{ width: "40%" }} className="search-box">
                            <Input onChange={handleChange} prefix={<SearchOutlined/>} placeholder="Search Movies" />
                        </div>
                        <ul style={{width:"25%"}} className=" d-flex align-items-center justify-content-between">
                            <li className="d-flex align-items-center justify-content-between">
                                <Dropdown menu={{ items }}>
                                    <NavLink className={"text-light text-decoration-none"}>Kinolar Turi</NavLink>
                                </Dropdown>
                                <button className="text-light d-flex align-items-center justify-content-between btn-2 ms-4"> <MenuOutlined/> <p style={{position:"relative", top:"7px", left:"7px"}} className=" text-light" onClick={() => dialogRef.current.open = true}>menu ochish</p></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <dialog ref={dialogRef} className="dialog" open={false}>
                <div className="d-flex align-items-center justify-content-between">
                <Link className="text-decoration-none" to={"/post"}><button className="btns"> <MessageOutlined/> Post Yozish . </button></Link>
                <button className="btns" onClick={handleLogOut}> <LogoutOutlined/> Log Out .</button>
                </div>
                <div>
                <button className="btns-1" onClick={() => dialogRef.current.open = false}>Menuni Yopish</button>
                </div>
            </dialog>
           <Outlet/>
        </>
    )
}