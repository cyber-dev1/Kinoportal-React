import { useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../../../Settings/Context/Context"
import { Api, BASE_IMG } from "../../../Api"
import { List } from "../List"
import ReactPaginate from "react-paginate"
import { Link, Outlet } from "react-router-dom"

export const Teatr = () => {
    const {activePage, setActivePage} = useContext(Context)
    const [info, setInfo] = useState(0)
    const [recomindations, setRecomindations] = useState([])
    const getRecomindations = useCallback( async() => {
        try {
            const request = await Api.getRecomindation(activePage)
            console.log(request.data.total_pages);
            setInfo(request.data.total_pages)
            const response = await request.data
            console.log(response.results)
            setRecomindations(response.results)
        } catch (error) {
            console.log(error);
        }
    },[activePage])
    useEffect(() => {
        getRecomindations()
    },[getRecomindations])
    const handleChange = (event) => {
        setActivePage(event.selected+1)
    }
    return(
        <main>
            <section>
                <div className="container">
                    <h1 className="text-center text-dark mt-3"> Teatrlarda </h1>
                    <div>
                        {recomindations?.length? 
                            <div className="actors-map">
                                {recomindations?.map((item) => (
                                    <Link className="text-decoration-none" to={`/movie/${item.id}`}>
                                    <List year={item.release_date} key={item.id} name={item.original_title} img={BASE_IMG + "/" + item.poster_path} />
                                    </Link>
                                ))}
                            </div>
                        :<h1>Qidirilmoqda . . .</h1>}
                    </div>
                </div>
            </section>
            <div>
                <ReactPaginate onPageChange={handleChange} pageClassName="page" pageCount={info} nextClassName="next" previousClassName="next" previousLinkClassName="next-link" nextLinkClassName="next-link" className="clas"/>
            </div>
           
        </main>
    )
}