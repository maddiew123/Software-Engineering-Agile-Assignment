

import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
export default function Profile() {
  const navigate = useNavigate();

   const token = localStorage.getItem("tokenya");
  let name = "";
  let team = "";
  let

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded)
      name = decoded.full_name; // assuming your token contains "username"
    } catch (e) {
      console.error("Invalid token", e);
    }
  }

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
            <h1>Profile page</h1>
            <p>Hello {name}, welcome to your profile page</p>
</>
        )}
       
        <button onClick={signOut}>sign out</button>
      </div>
    </>
  );
}


