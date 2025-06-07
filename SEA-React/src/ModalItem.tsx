import { Modal, Tooltip } from "@mui/material";
import { useState } from "react";
import MatchInput from "./MatchInput";
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function ModalItem({ num, index, match, handleUpdate }: { num: number, index: number; match: object, handleUpdate: (index: number, updatedMatch: Match) => void; }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Tooltip title="Edit Match Details">
      <button onClick={handleOpen}>
        <EditNoteIcon/>
      </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        
        
        <MatchInput num={num} index={index} inlocation={match.location} indate={match.date} inopponent={match.opponent_team_id} inhome={match.home_team_id} handleUpdate={handleUpdate}/>
      
      </Modal>
    </div>
  );
}