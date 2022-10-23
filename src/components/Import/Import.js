import React, { useState } from "react";
import Vector from "../../Images/Vector.png";
import importLogo from "../../Images/importLogo.png";
import importComplete from "../../Images/importComplete.png";
import { useNavigate } from "react-router-dom";
import { parse } from "papaparse";
import { useAPI } from "../../context/useContext";
import { Link } from "react-router-dom";
import "./ImportStyle.css";

export default function Import() {
  const { matchData } = useAPI();
  const navigate = useNavigate();
  const [flag, setFlag] = useState({
    click: false,
    highlighted: false,
    isComplete: false,
    canGoToDashBoard: false,
  });

  if (flag.canGoToDashBoard) {
    if (matchData.length > 0) navigate("/Table");
  }

  const handleFlag = (key, value) => {
    setFlag((pre) => ({ ...pre, [key]: value }));
  };

  return (
    <div className="Container">
      <h1 className="heading">Please Import CSV File Of Matches to Go Ahead</h1>
      <div className="link">
      <Link to="/Dashboard-win-by-wickets">Win By Wickets</Link>
      <Link to="/Dashboard-win-by-runs">Win By Runs</Link>
      <Link to="/Table">Table</Link>
      </div>
      <div className="rowContainer">
        <div className="row2">
          <button className="importBtn" onClick={() => handleFlag("click", !flag.click)}>
            <img src={Vector} alt="Import Logo" className="importlogoImg" />
            Import
          </button>
        </div>
      </div>
      {flag.click && (
        <div className={`popup ${ flag.highlighted ? "highlighted" : "nothighlighted" }`}
          onDragOver={(e) => { e.preventDefault() }}
          onDragEnter={() => handleFlag("highlighted", true)}
          onDragLeave={() => handleFlag("highlighted", false)}
          onDrop={(e) => {
            e.preventDefault();
            handleFlag("highlighted", false);
            Array.from(e.dataTransfer.files).filter((files) => files.type === "text/csv").forEach(async (file) => {
                const text = await file.text();
                const result = parse(text, { header: true });
                localStorage.clear();
                localStorage.setItem("matchData",JSON.stringify(result.data))
                handleFlag("isComplete", true);
              });
          }}
        >
          {flag.isComplete ? (
            <>
              <div> <img src={importComplete} alt="PopUp" /> </div>
              <div className="popuptext">Import Complete</div>
              <div className="popuplink">CSV File is Uploaded</div>
              <div className="popupbtncontainer">
                <button className="popupbtn" onClick={() => {
                        handleFlag("click", !flag.click);
                        handleFlag("isComplete", false);
                        handleFlag("canGoToDashBoard", true)}}
                        >
                Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div><img src={importLogo} alt="PopUp" /></div>
              <div className="popuptext">Import File</div>
              <div className="popuplink">Drag & Drop a CSV File to Upload</div>
              <div className="popupbtncontainer">
                <button className="popupbtn" onClick={() => {
                        handleFlag("click", !flag.click);
                        handleFlag("isComplete", false) }}
                        >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
