import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Kinoportal, Login, PublicHome, Register } from "./Public";
import { Allpost, Default, Discover, Home, Movie, Post, Rating, Search, Tv } from "./Private";
import { Actor, Actors } from "./Private/Pages/Actors";
import { Teatr } from "./Private/Pages/Teatr";
const accessToken = window.localStorage.getItem("token")
export const rout = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={accessToken ? <Home /> : <PublicHome />}>
                <Route index element={accessToken ? <Default /> : <Register />} />
                <Route path="tv" element={<Tv />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="kinoportal-haqida" element={<Kinoportal />} />
                <Route path="rated-movies" element={<Rating />} />
                <Route path="rated-tv" element={<Tv />} />
                <Route path="rated-episode" element={<Teatr />} />
                <Route path="search" element={<Search />} />
            </Route>
            <Route path="/post" element={<Post />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/actor/:id" element={<Actor />} />
            <Route path="/all-posts" element={<Allpost />} />
            <Route path="public" element={<PublicHome />} >
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="kinoportal-haqida" element={<Kinoportal />} />
            </Route>
        </>
    )
)
