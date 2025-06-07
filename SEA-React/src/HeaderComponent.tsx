import { useNavigate } from "react-router-dom";
import  "./HeaderComponent.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdminOptions from "./AdminOptions";

export default function HeaderComponent({admin, loggedIn}:{admin:boolean,loggedIn:boolean}) { 
    const navigate = useNavigate()
    const signOut = () => {
        localStorage.removeItem("tokenya");
        navigate("/");
    };

return (
    <Box className="header">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color:"white"}}>
            Hockey Team
          </Typography>
          {(admin)&& <AdminOptions/>}
          {(loggedIn) && <button className="signOut" onClick={signOut}>sign out</button>}
          
        </Toolbar>
      </AppBar>
    </Box>
   
)

}
