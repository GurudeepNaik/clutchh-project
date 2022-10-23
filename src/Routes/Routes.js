import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboardwinbyruns from ".././components/Win By Runs/Dashboard-win-by-runs";
import Dashboardwinbywickets from ".././components/Win By Wickets/Dashboard-win-by-wickets";
import Table from ".././components/Table/Table.js";
import App from ".././App";

const Routing = () => {
  return (
    <div>
     <BrowserRouter>
        <Routes>
          <Route element={<App />} path="/" />
          <Route element={<Dashboardwinbyruns />} path="/Dashboard-win-by-runs" />
          <Route element={<Dashboardwinbywickets />} path="/Dashboard-win-by-wickets" />
          <Route element={<Table/>} path="/Table" />
        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default Routing