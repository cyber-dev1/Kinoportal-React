import { useCallback, useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Context } from "../../Settings/Context/Context"
import axios from "axios"
import { Api, BASE_IMG } from "../../Api"
import "./Movie.css"
export const Movie = () => {
    const params = useParams()
    const {movie, setMovie} = useContext(Context)
    const getMovies = useCallback(async () => {
       const movie = Api.getMovie(params.id)
       movie.then((response) => {
        setMovie([response.data])})
    },[params.id])
    useEffect(() => {
        getMovies()
    },[getMovies])
    return(
        <div>
            {movie?.length?
                <>
                    {movie?.map((item) => (
                        <div className="get-movie">
                            <div className="img-box">
                            <img className="get-img" src={BASE_IMG + "/" + item.poster_path} alt="img" />
                            </div>
                            <div className="box-title">
                            <h3 className="get-title text-danger"> name : <span className="text-light"> {item.original_title}</span></h3>
                            <h3 className="get-year text-danger">year : <span className="text-light"> {item.release_date}</span></h3>
                            <h3 className="text-danger">original language : <span className="text-light"> {item.original_language}</span></h3>
                            <h3 className="text-danger">overview : <span className="text-light"> {item.overview}</span></h3>
                            <h3 className="text-danger">popularity : <span className="text-light"> {item.popularity}</span></h3>
                            <h3 className="text-danger">vote average : <span className="text-light"> {item.vote_average}</span></h3>
                            <h3 className="text-danger">vote count : <span className="text-light"> {item.vote_count}</span></h3>
                            <Link to={`/actors/${item.id}`}><span className="text-danger fs-4">{item.original_title} </span> <span className="fs-4 text-light"> Film Aktyorlari</span> </Link>
                            </div>
                        </div>
                    ))}
                </> 
            :<h1 className="text-center">Yuklanmoqda . . .</h1>}
        </div>
    )
}