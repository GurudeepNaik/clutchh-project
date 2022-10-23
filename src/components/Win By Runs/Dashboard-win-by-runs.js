import React,{useState} from "react";
import { useAPI } from "../../context/useContext";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import { Link } from "react-router-dom";
// import './Dashboard-win-by-runs.css'

const Dashboardwinbyruns = () => {
  const { matchData } = useAPI();
  const [year, setYear] = useState("2017");
  ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

  let myData =  matchData.map((data) => {
    const {season,winner,win_by_runs}=data
    return {season:season, label:winner, value:win_by_runs }
  }).filter((value) =>  value.season === year);

  const dataSource = {
    chart: {
      caption: `Team Won By Most Runs In The Year ${year}`,
      xAxisName: "Team In the Season",
      yAxisName: "Run Difference",
      numberSuffix: "Run",
      theme: "fusion",
    },
    data: myData,
  };

  const chartConfigs = {
    type: "bar2d",
    width: "100%",
    height: 2000,
    dataFormat: "json",
    dataSource: dataSource,
  };

  const handleSelectChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div id="dashboard">
     <h1 className="table_heading">Dashboard Win By Runs [2008-2017]</h1>
     <div className="link">
     <Link to="/Table">Table</Link>
     <Link to="/Dashboard-win-by-wickets">Win By Wickets</Link>
     </div>
     <div className="secondFieldContainer">
      <select value={year} onChange={handleSelectChange} className="selectField">
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        <option value="2014">2014</option>
        <option value="2013">2013</option>
        <option value="2012">2012</option>
        <option value="2011">2011</option>
        <option value="2010">2010</option>
        <option value="2009">2009</option>
        <option value="2008">2008</option>
      </select>
      </div>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default Dashboardwinbyruns;
