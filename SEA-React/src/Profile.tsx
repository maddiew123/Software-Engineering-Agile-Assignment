

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export default function Profile() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("temitope");
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
            <h1>Profile page</h1>
            <p>Hello {data.full_name}, welcome to your profile page</p>
</>
        )}
       
        <button onClick={signOut}>sign out</button>
      </div>
    </>
  );
}


