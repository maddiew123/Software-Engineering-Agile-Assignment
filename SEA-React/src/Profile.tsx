

import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MatchCard from "./MatchCard";
import "./Profile.css"
import AdminOptions from "./AdminOptions";
import HeaderComponent from "./HeaderComponent";

export default function Profile() {
  const navigate = useNavigate();

  type Match = {
    match_id?: number;
    location: string;
    date: string;
    opponent_team_id: number;
    home_team_id: number;
    match_report: string;
  };

  const [userMatches, setUserMatches] = useState<Match[]>([]);


  const token = localStorage.getItem("tokenya");
  let name = "";
  let team = "";
  let role = "";


  if (token) {
    try {
      const decoded = jwtDecode(token);

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
        if (admin) {
          try {
          const response = await fetch(`http://localhost:8000/match/`);
          const data = await response.json();
          console.error("Fetched All teams:", data);
          setUserMatches(data.Match);
        } catch (error) {
          console.error("Error fetching All teams:", error);
        }}
        else {
        try {
          const response = await fetch(`http://localhost:8000/match/team/${team}`);
          const data = await response.json();
          console.error("Fetched teams:", data);
          setUserMatches(data.user_match);
        } catch (error) {
          console.error("Error fetching teams:", error);
        }
      }
        }}

    fetchUserMatches();
  }, [team]);

  const handleUpdate = (
    index: number | null,
    updatedFields: Partial<Match> | null
  ) => {
    if (index === null) return;
    if (updatedFields) {
      setUserMatches((prevMatches) => {
        if (index < 0 || index >= prevMatches.length) return prevMatches;

        const existingMatch = prevMatches[index];
        const updatedMatch = {
          ...existingMatch,
          ...updatedFields,
        };

        const newMatches = [...prevMatches];
        newMatches[index] = updatedMatch;
        return newMatches;

      })
    } else {
      setUserMatches((prevMatches) => {
        return prevMatches.filter((_, i) => i !== index);
      })
    };
  };

 
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/")
    return res.json();
  };

  const { isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  let admin: boolean = false
  if (role == "Manager") {
    admin = true
    
  }

  return (
    <>
      <HeaderComponent admin={admin} loggedIn={true} />
      <div className="profile-container">

        {error && <p>Error fetching data</p>}
        {isPending && <p>fetching data...</p>}
        {!isPending && !error && (
          <>
            <p>Hello {name}, welcome to your profile page</p>


            <div className="match-list">
              {(userMatches.length == 0) ?
                <p>you have no matches</p> :

                userMatches.map((match, i) => {



                  return (
                    <>


                      <MatchCard num={i} element={match} index={match.match_id} handleUpdate={handleUpdate} admin={admin} />
                    </>
                  )
                })}
            </div>
          </>
        )}



      </div>
    </>
  );
}


