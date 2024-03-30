import { useContext } from "react"
import { Context } from "../../../Settings/Context/Context"
import { useState } from "react"
import { useCallback } from "react"
import { Api, BASE_IMG } from "../../../Api"
import { useEffect } from "react"
import { List } from "../List"
import ReactPaginate from "react-paginate"
import { Link, Outlet } from "react-router-dom"

export const Rating = () => {
    const {activePage, setActivePage} = useContext(Context)
    const [info, setInfo] = useState(0)
    const [rating, setRating] = useState([])
    const getRating = useCallback( async() => {
        try {
            var request = await Api.getRating(activePage)
            console.log(request.data.total_pages)
            setInfo(request.data.total_pages)
            const response = await request.data
            console.log(response.results)
            setRating(response.results)
        } catch (error) {
            console.log(error);
        }
    },[activePage])
    useEffect(() => {
        getRating()
    },[getRating])
    const handleChange = (event) => {
        setActivePage(event.selected+1)
    }
    return(
        <>
            <div className="container">
                <h1 className="text-center mt-4">Rating Movies</h1>
                <div className="box-rating">
                        {rating?.length? 
                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap"}}>
                                {rating?.map((item) => (
                                    <Link className="text-decoration-none" to={`/movie/${item.id}`}>
                                    <List year={item.release_date} key={item.id} name={item.original_title} img={BASE_IMG + "/" + item.poster_path}/>
                                    </Link>
                                ))}
                            </div>
                        :<h1 className="text-center">Qidirilmoqda . . .</h1>}
                </div>
                <div>
                <ReactPaginate onPageChange={handleChange} pageClassName="page" pageCount={info} nextClassName="next" previousClassName="next" previousLinkClassName="next-link" nextLinkClassName="next-link" className="clas"/>
                </div>
            </div>
           
        </>
    )
}