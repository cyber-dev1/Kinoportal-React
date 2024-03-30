import { Link, Outlet, useParams } from "react-router-dom"
import "./Actors.css"
import { useCallback, useEffect, useState } from "react"
import { Api, BASE_IMG } from "../../../Api"
export const Actors = () => {
    const params = useParams()
    const [actors, setActors] = useState([])
    const [info, setInfo] = useState({
        isLoading: true,
        data: [],
        isError: false
    })
    const getActors = useCallback(async () => {
        try {
            const request = await Api.getActor(params.id)
            const response = await request.data.cast
            setActors(response)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }, [params.id])
    const getMovies = useCallback(() => {
        const data = Api.getMovie(params.id)
        data.then((response) => setInfo({
            isLoading: false,
            data: response.data,
            isError: false,
        }))
    }, [params.id])
    useEffect(() => {
        getActors();
        getMovies()
    }, [getActors, getMovies])
    return (
        <main>
            <section>
                <div className="actor-box">
                    <h1 className=" text-center"> <span className="text-danger">{info?.data?.title} </span>: Filmi Aktyorlari</h1>
                    {actors?.length ?
                        <div className="actors-map">
                            {actors?.map((item) => (
                                <Link className="text-decoration-none" to={`/actor/${item.credit_id}`}>
                                    <div className="actors">
                                        {item.profile_path !== null ? <img className="actor" src={BASE_IMG + "/" + item.profile_path} alt="" /> : <h1 className="text-center">Bu Aktorning Rasmi Topilmadi</h1>}
                                        <h2 className="text-success text-center">{item.name}</h2>
                                        <h2 className="text-center text-danger">{item.character} <span className="text-light">: Rolni Ijro Etgan</span> </h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        : <h1> <span className="text-danger text-center"> {info?.data?.title} </span> Haqida malumot topilmadi </h1>}
                </div>
            </section>
           
        </main>
    )
}