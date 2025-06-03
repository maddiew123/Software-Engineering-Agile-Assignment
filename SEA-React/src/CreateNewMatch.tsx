import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';
import axios from 'axios';
export default function createNewMatch() {
    const [teamList, setTeamList] = useState([]);
    const [location, setLocation] = useState("");
    const [date, setDate]= React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [opponent, setOpponent] = useState("");
    const [home, setHome] = useState("");
    
    useEffect(() => {
        const fetchUserMatches = async () => {
           try {
          const res = await fetch(`http://localhost:8000/team/`);
          const data = await res.json();
          setTeamList(data.teams);
          // console.log(data.teams[2].team_name)
        } catch (error) {
          console.error("Error fetching team name:", error);
        }
        };
    
        fetchUserMatches()})
      
  const postMatch = async() => {
    console.log("hfiu", date?.format('YYYY-MM-DD'))
    const data = { 
    location: location,
    date: date?.format('YYYY-MM-DD'),
    opponent_team_id: opponent,
    home_team_id: home,
} 

axios.post('http://127.0.0.1:8000/item' , data)
}

  return (
    <>
    <p>create new match</p>
    <p>location:</p>
    <input onChange={(e) => setLocation(e.target.value)}></input>
    <p>date</p>
    <LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker label="Basic date picker"   value={date}
  onChange={(newDate) => setDate(newDate)}/></LocalizationProvider>
    <p>opponent</p>
    <Select
    // value={age}
    label="opponent"
    onChange={(event: SelectChangeEvent) => {
    setOpponent(event.target.value)}}
  >
    {teamList.map((team, index) => {
      if (!team) return null; 
      return <MenuItem value={index + 1}>{team.team_name}</MenuItem>
           
      })} 
 
  </Select>
    <p>home team</p>
         <Select


    label="home"
    onChange={(event: SelectChangeEvent) => {
    setHome(event.target.value)}}
  >
    {teamList.map((team, index) => {
        
                return <MenuItem value={index+1}>{team.team_name}</MenuItem>
           
            })} 
 
  </Select>
  <button onClick={postMatch}>Create</button>
</>
  );
}

