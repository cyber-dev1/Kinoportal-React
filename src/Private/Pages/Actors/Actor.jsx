import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Api, BASE_IMG, BASE_URL } from "../../../Api"

export const Actor = () => {
    const params = useParams()
    const [userActor, setUserActor] = useState([])
    const getUser = useCallback(async () => {
        var data = Api.getUser(params.id)
        data.then((response) => {console.log(response.data)
             setUserActor([response.data])})
    }, [params.id])
    useEffect(() => {
        getUser()
    }, [getUser])
    return (
        <main>
            <section>
                <div className="user-box">
                    {userActor?.length? 
                        <div>
                            {userActor?.map((item) => (
                                <div className="user-align">
                                    <div className="user-support">
                                    {item.person.profile_path !== null? <img className="user-img" src={BASE_IMG + "/" + item.person.profile_path} alt="" /> : <h1>Bu aktorning Rasmi Topilmadi</h1> }
                                    <h2 className="text-danger mt-3 text-center">{item.person.name}</h2>
                                    </div>
                                    <div className="user-descrip">
                                        <h2><span className="text-danger">{item.person.name}</span> ning <span>{item.media.title}</span> uchun roli haqida Description </h2>
                                        <h3 className="my-5">{item.media.overview}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    :<h1>Malumotlar topilmadi</h1>}
                </div>
            </section>
        </main>
    )
}