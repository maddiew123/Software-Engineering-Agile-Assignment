

import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function Profile() {
  const navigate = useNavigate();

  
  const [userMatches, setUserMatches] = useState([]);


   const token = localStorage.getItem("tokenya");
  let name = "";
  let team = "";
  let role = "";
  

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded)
      name = decoded.full_name;
      team = decoded.team_id;
      role = decoded.role;

    } catch (e) {
      console.error("Invalid token", e);
    }
  }


  useEffect(() => {
    const fetchUserMatches = async () => {
      if (team) {
        try {
          const res = await fetch(`http://localhost:8000/match/${team}`);
          const data = await res.json();
          console.log("ooob", data.user_match)
          setUserMatches(data.user_match);
        } catch (error) {
          console.error("Error fetching teams:", error);
        }
      }
    };

    fetchUserMatches();
  }, [team]);

    

  const signOut = () => {
    localStorage.removeItem("tokenya");
    navigate("/");
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/")
    return res.json();
  };

  const {data,isPending,error} = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });



  return (
    <>
      <div style={{ marginTop: 20, minHeight: 700 }}>
        {error && <p>Error fetching data</p>}
        {isPending && <p>fetching data...</p>}
        {!isPending && !error &&(
            <>
              <p>Hello {name}, welcome to your profile page</p>
           
  
          
              {userMatches.map((match) => {
        
                return <MatchCard element={match}/> 
           
            })}  
</>   
        )}
        <div>
          {role == "Coach" ? ( <button >add match</button>) : (<></>) }
        </div>
       
        <button onClick={signOut}>sign out</button>
      </div>
    </>
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

function MatchCard({ element }: {element: object}) {
  const homeTeamName = useTeamName(element.home_team_id);
  const opponentTeamName = useTeamName(element.opponent_team_id);

  return (
    <div style={{border:"5", color:"red"}}>
      <p>{homeTeamName} VS {opponentTeamName}</p>
      <p>Date: {element.date}</p>
      <p>Location: {element.location}</p>
    </div>
  );
}



