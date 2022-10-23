import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useAPI } from "../../context/useContext";
import "./TableStyle.css";
import { Link } from "react-router-dom";

const Table = () => {
  const { matchData } = useAPI();
  const [Popup, setPopup] = useState({});
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [year, setYear] = useState("all");

  let myData =  matchData.map((data) => data);
  let rowdata;

  if (year !== "all")  rowdata = myData.filter((value) =>  value.season === year);
  else rowdata=myData

  const rows = rowdata;
  const columns = [
    { field: "season", headerName: "Year", width: 70 },
    { field: "team1", headerName: "Team 1", width: 250 },
    { field: "team2", headerName: "Team 2", width: 250 },
    { field: "winner", headerName: "Winner", width: 250 },
    { field: "player_of_match", headerName: "Man Of The Match", width: 300 },
  ];

  const handleRowClick = (rowData) => {
    setPopup(rowData);
    handleOpen();
  };

  const handleSelectChange = (e) => {
    setYear(e.target.value);
  };

  const handleClose = () => setIsModelOpen(false);
  const handleOpen = () => setIsModelOpen(true);

  return (
    <div className="table_container">
      <h1 className="table_heading">Table View</h1>
      <div className="link">
      <Link to="/Dashboard-win-by-wickets">Win By Wickets</Link>
      <Link to="/Dashboard-win-by-runs">Win By Runs</Link>
      <Link to="/">Home</Link>
      </div>
      <h4 className="note">Note: Please Select Year in Drop Down and You can see More Data On Click of Row </h4>
      <div className="secondFieldContainer">
      <select value={year} onChange={handleSelectChange} className="selectField">
        <option value="all">All</option>
        <option value="2008">2008</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
      </select>
      </div>
      {matchData.length > 0 ? (
        <div style={{ height: 600, width: "90%", margin: "auto" }} id="tableContainer">
          <DataGrid rows={rows} columns={columns} pageSize={10} autoHeight onRowClick={(rowData) => handleRowClick(rowData.row)} />
          <Modal open={isModelOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className="Boxstyle">
                <h3 className="popupText"><strong>Season:</strong> {Popup.season}</h3>
                <h3 className="popupText"><strong>Team-1:</strong> {Popup.team1}</h3>
                <h3 className="popupText"><strong>Team-2:</strong> {Popup.team2}</h3>
                <h3 className="popupText"><strong>Date:</strong> {Popup.date}</h3>
                <h3 className="popupText"><strong>Umpire-1:</strong> {Popup.umpire1}</h3>
                <h3 className="popupText"><strong>Umpire-2:</strong> {Popup.umpire2}</h3>
                <h3 className="popupText"><strong>Vanue:</strong> {Popup.venue}</h3>
                <h3 className="popupText"><strong>City:</strong> {Popup.city}</h3>
                <h3 className="popupText"><strong>Toss Decision:</strong> {Popup.toss_decision}</h3>
                <h3 className="popupText"><strong>DL Applied:</strong> {Popup.dl_applied}</h3>
                <h3 className="popupText"><strong>Toss Winner:</strong> {Popup.toss_winner}</h3>
                <h3 className="popupText"><strong>Result:</strong> {Popup.result}</h3>
                <h3 className="popupText"><strong>Winner:</strong> {Popup.winner}</h3>
                <h3 className="popupText"><strong>Player Of The Match:</strong> {Popup.player_of_match}</h3>
                <h3 className="popupText"><strong>Win By Runs:</strong> {Popup.win_by_runs}</h3>
                <h3 className="popupText"><strong>Win By Wickets:</strong> {Popup.win_by_wickets}</h3>
            </Box>
          </Modal>
        </div>
      ):( <div className="spinner"><CircularProgress className="roller" /></div> ) }
    </div>
  );
};

export default Table;
