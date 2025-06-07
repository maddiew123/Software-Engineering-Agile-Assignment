import { useEffect, useState } from "react";
import ModalItem from "./ModalItem";
import "./Profile.css"
import DateIcon from "./DateIcon";

import Tooltip from "@mui/material/Tooltip";
import { Modal, TextField } from "@mui/material";
import AddMatchReport from "./AddMatchReport";

export default function MatchCard({ num, element, index, handleUpdate, admin, handlePartialUpdate }: { num:number,element: any, index: number , admin: boolean,  handleUpdate: (index: number, updatedMatch: any) => void; handlePartialUpdate: (index: number, updatedMatch: any) => void;}) {
  const homeTeamName = useTeamName(element.home_team_id);
  const opponentTeamName = useTeamName(element.opponent_team_id);




  return (
    <div key={index} className="match-card">
      <div className="match-title">
        <DateIcon date={element.date}/>
        <p className="teams">{homeTeamName} VS {opponentTeamName}</p>
        
      </div>
      <div className="body">
      <p>Location: {element.location}</p>
      <p>Match Report: {element.match_report}</p>
      </div>
      {/*TODO: match report if null have the option to add */}
      <div className="edit-button">
      {(admin)&&
      <ModalItem num={num} index={index} match={element} handleUpdate={handleUpdate} />}
   
      <AddMatchReport curReport={element.match_report} num={num} index={index} handleUpdate={handleUpdate}/>
      </div>


    </div>

  );
}

function useTeamName(team: number) {
  const [teamName, setTeamName] = useState("");
  useEffect(() => {
    const fetchTeamName = async () => {
      if (team) {
        try {
          const res = await fetch(`http://localhost:8000/team/${team}`);
          const data = await res.json();
          setTeamName(data.team_name);
        } catch (error) {
          console.error("Error fetching team name:", error);
        }
      }
    };

    fetchTeamName();
  }, [team]);

  return teamName
}
