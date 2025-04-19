import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { AddTask } from "../pages/AddTask";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/TODOAPP" element={<Home />} />
            <Route path="/add" element={<AddTask />} />
        </Routes>
    )
}

export default AppRoutes
