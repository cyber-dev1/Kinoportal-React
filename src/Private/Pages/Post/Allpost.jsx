import { useEffect, useState } from "react"

export const Allpost = () => {
    const User = window.localStorage.getItem("user")
    const [user, setUser] = useState(User ? JSON.parse(User) : [])
    const [all, setAll] = useState([])
    const getAll = () => {
        fetch(`http://localhost:5555/posts`).then((response) => response.json()).then((data) => setAll(data)).catch((error) => console.log(error))
    }
    useEffect(() => {
        getAll()
    }, [user.id])
    return (
        <div>
            <h1 className="text-center mt-3">Barcha Postlar</h1>
            <div>
                {all?.length ?
                    <div style={{flexWrap:"wrap"}} className="d-flex align-items-center justify-content-around">
                        {all?.map((item) => (
                            <div style={{ width: "300px", margin: "10px", border: "1px solid #787878", borderRadius: "10px", height: "auto" }}>
                                <h4>{item.username}</h4>
                                <input readOnly={true} defaultValue={item.text} className="form-control" type="text" />
                                <div className="mt-5">
                                    <small>{item.creat} <span className="text-danger"> post create At</span> </small>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <h1>Hali postlar mavjud emas</h1>}
            </div>
        </div>
    )
}