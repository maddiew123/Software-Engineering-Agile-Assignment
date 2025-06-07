import { useEffect, useState } from "react";

import StickyHeadTable from "./StickyHeadTable";
import HeaderComponent from "./HeaderComponent";


export default function ViewAllTeams() {
    const [allTeams, setAllTeams] = useState([])
    useEffect(() => {

        const fetchAllTeams = async () => {

            try {
                const response = await fetch(`http://localhost:8000/team/`);
                const data = await response.json();
                console.log("Fetched teams:", data);
                setAllTeams(data.Teams);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        }
        fetchAllTeams();
    }, []);


    return (
        <>
        <HeaderComponent admin={true} loggedIn={true} />
            <p>ALL  TEAMS</p>
            {(allTeams.length == 0) ?
                <p>no teams</p> :
                <>
            
                <StickyHeadTable rows={allTeams} />
                </>
            }
        </>
    );
}


