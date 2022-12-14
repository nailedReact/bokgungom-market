import { useState, useContext } from "react";
import useAuth from "../../hook/useAuth"
import UserContext from "../../context/UserContext";


export default function Splash() {
    const data = useContext(UserContext)
    console.log(data)
    return (
        <>
            <div>Splash</div>
        </>
    )
}