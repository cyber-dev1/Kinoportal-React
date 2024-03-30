// import { Link, NavLink } from "react-router-dom"
// import axios from "axios"
import { useCallback } from "react"
import { Api, BASE_IMG } from "../../Api"
import { useEffect } from "react"
import { useState } from "react"
import { List } from "./List"
import ReactPaginate from "react-paginate"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Home } from "../Home"
// import img from "../../Assets/images/Qasoskorlar.jpeg"
export const Tv = () => {
    const navigator = useNavigate()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [info, setInfo] = useState(1)
    const [total, setTotal] = useState([])
    const getPopular = useCallback(async () => {
        try {
            const request = await Api.getPopular(page)
            const page_info = await request.data
            setInfo(page_info.total_pages)
            setTotal(page_info.total_pages)
            const response = await request.data
            console.log(response.results);
            setData(response.results)

        } catch (error) {
            console.log(error)
        }
    }, [page])
    useEffect(() => {
        getPopular()
    }, [getPopular])
    const handleChange = (event) => {
        setPage(event.selected+1)
    }
    return (
        <>
            <div className="container">
                <div className="mt-4 d-flex align-items-center justify-content-around">
                <h1>Popular</h1>
                <button className="btn-1" onClick={() => setPage(1)}>Clear</button>
                </div>
                {data.length ?
                    <div className="box-map">
                        {data?.map((item) => (
                             <Link className="text-decoration-none" to={`/movie/${item.id}`}>
                                <List year={item.release_date} key={item.id} name={item.original_title} img={BASE_IMG + "/" + item.poster_path} />
                             </Link>
                        ))}
                    </div>
                    :<h1 className="text-center mt-3">Qidirilmoqda . . .</h1>}
            </div>
            <div>
                <ReactPaginate onPageChange={handleChange} pageClassName="page" pageCount={total} nextClassName="next" previousClassName="next" previousLinkClassName="next-link" nextLinkClassName="next-link" className="clas"/>
            </div>
           
        </>
    )
}