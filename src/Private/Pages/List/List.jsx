import "./List.css"
export const List = ({name ,year,key, img}) => {
    return(
        <>
            <div className="popular-box">
                <img className="imgs" src={img} alt="" />
                <h2 className="title">{name}</h2>
                <h4 className="year">{year}</h4>
            </div>
        </>
    )
}