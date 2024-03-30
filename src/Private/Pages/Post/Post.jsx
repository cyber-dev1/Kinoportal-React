import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Item from "antd/es/list/Item";
export const Post = () => {
    const params = useParams()
    const User = window.localStorage.getItem("user")
    const [user, setUser] = useState(User ? JSON.parse(User) : [])
    const date = new Date()
    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(false);
    const PostRef = useRef()
    const handleOpen = () => setOpen(!open);
    const handleSub = async (e) => {
        e.preventDefault()
        try {
            const request = await axios.post(`http://localhost:5555/posts` ,{
                text: PostRef.current.value ,
                userId : user.id ,
                username : user.name ,
                creat : date.getDate() + " " + date.getDay() + " " + date.getHours() + " " + date.getMinutes() ,
            })
            const response = await request.data
            console.log(response);
            getPost()
        } catch (error) {
            console.log(error);
        }
    }
    const getPost = () => {
        fetch(`http://localhost:5555/posts/?userId=${user.id}`).then((response) => response.json()).then((data) => setData(data)).catch((error) => console.log(error))
    }
    useEffect(() => {
        getPost()
    },[user.id])
    const Delete = async (id) => {
        try {
            const request = await axios.delete(`http://localhost:5555/posts/${id}`)
            if(request.status === 200 || request.status === 201){
                getPost()
            }
            const response = await request.data
            return response
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className="text-center mt-2">Post Yozish</h1>
            <Button style={{ marginTop: "30px", marginLeft: "20px" }} onClick={handleOpen}>Post Yozish Uchun Bosing</Button>
            <Link className="fs-5" style={{ position: "relative", left: "1000px", top: "15px", color: "black" }} to={"/all-posts"}>Barcha Postlar</Link>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <form onSubmit={handleSub}>

                    <div className="flex items-center justify-between">
                        <DialogHeader className="flex flex-col items-start">
                            {" "}
                            <Typography className="mb-1" variant="h4">
                                New Post to +{" "}
                            </Typography>
                        </DialogHeader>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5"
                            onClick={handleOpen}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <DialogBody>
                        <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
                            Write the post and then click button.
                        </Typography>
                        <div className="grid gap-7">
                            <Typography className="-mb-1" color="blue-gray" variant="h6">
                                Post Yozing
                            </Typography>

                            <input className="form-control mt-3" ref={PostRef} type="text" placeholder="Post Kiriting" />

                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="text" color="gray" onClick={handleOpen}>
                            cancel
                        </Button>
                        <Button type="submit" variant="gradient" color="gray" onClick={handleOpen}>
                            Post Add 
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            <div style={{ border: "1px solid black", width: "98%", height: "auto", margin: "0 auto", marginTop: "30px" }} className="post-box">
                <div>
                    {data?.length? 
                        <div style={{flexWrap:"wrap"}} className="d-flex align-items-center justify-content-around">
                            {data?.map((item) => (
                                <div style={{width:"300px", margin:"10px" , border:"1px solid #787878", borderRadius:"10px" , height:"auto"}}>
                                    <h4>{item.username}</h4>
                                    <input readOnly={!false} defaultValue={item.text} className="form-control" type="text" />
                                    <div className="mt-5 d-flex align-items-center justify-content-between">
                                    <small>{item.creat} <span className="text-danger">post create At </span></small>
                                    <button className=" btn btn-danger" onClick={() => Delete(item.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    :<h1>Hali Postlar Mavjud emas</h1>}
                </div>
            </div>
        </>
    )
}