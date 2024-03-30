import { useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../../Settings/Context/Context"
import axios from "axios"
import { BASE_IMG, api_key } from "../../Api"
import { List } from "antd"
import { Link, Outlet, useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import { Home } from "../Home"

export const Search = () => {
    const navigator = useNavigate()
    const [info, setInfo] = useState(1)
    const { user, setName, name, setSearch} = useContext(Context)
    const { search, activePage, setActivePage } = useContext(Context)
    const api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${name}&page=${activePage}`
    const getSearch = useCallback(async () => {
        try {
            const request = await axios.get(api)
            const response = await request.data
            console.log(response.results);
            setInfo(response.total_pages)
            setSearch(response.results)
        } catch (error) {
            console.log(error);
        }
    }, [api])
    useEffect(() => {
        getSearch()
    }, [getSearch])
    const handleChange = (event) => {
        setActivePage(event.selected+1)
    }
    return (
        <>

        <div>
            {/* <h1 className="text-center mt-4">
                Kinolar Qidirilmoqda  . . .
            </h1> */}
            {search.length ?
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                    {search?.map((item) => (
                        <Link className="text-decoration-none" to={`/movie/${item.id}`}>
                            <div className="popular-box">
                                <img className="imgs" src={BASE_IMG + "/" + item.poster_path} alt="" />
                                <h2 className="title">{item.original_title}</h2>
                                <h4 className="year">{item.release_date}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
                : navigator("rated-tv")}
            <div>
                <ReactPaginate onPageChange={handleChange} pageClassName="page" pageCount={info} nextClassName="next" previousClassName="next" previousLinkClassName="next-link" nextLinkClassName="next-link" className="clas" />
            </div>
        </div>
          <Outlet/>
         </>
    )
}