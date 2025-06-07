import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import "./StickyHeadTable.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Box, Button, Snackbar, TextField } from '@mui/material';

export default function StickyHeadTable({ rows }: { rows: Array<Object> }) {


    const columns: readonly Column[] = [
        { id: 'name', label: 'Team Name', minWidth: 170 },
    ];

    interface Column {
        id: 'name';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }



    return (
        <Paper>
            <ActionButtons/>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.team_id}>
                                <TableCell className="cell" component="th" scope="row">
                                    {row.team_name}
                                    <ActionButtons info={row} />
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export function ActionButtons({ info}: { info?: Object}) {
   
  
    const key = info?.team_id 
    const [teamName, setTeamName] = useState(info?.team_name ) 
    const [confirm, setConfirm] = useState(false)
    const [open, setOpen] = useState(false);
    const [method, setMethod] = useState("");
    const handleOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        setOpenChild(false)
    };

    const [action, setAction] = useState("")
    useEffect(() => {
        if (!key) {
            setAction("Create New");
        } else {
            setAction("Update");
        }
    }, [key]);



    const [openChild, setOpenChild] = useState(false);
    const handleCreate = () => {
       
        setOpenChild(true);

    };

    const postMatch = async () => {
        if (!key) {
            try {
                const data = {
                    team_name: teamName
                }
                const response = await axios.post('http://127.0.0.1:8000/team/create', data)
                console.log('Team Created:', response.data);
                setConfirm(true)
                handleClose()
            } catch (error) {
                console.error('Error creating match:', error);
            }

        }
        else {
            try {
                const data = {
                    team_name: teamName
                }

                const response = await axios.put(`http://127.0.0.1:8000/team/update/${key}`, data)
                console.log('Team Updated:', response.data);
                setConfirm(true)
                handleClose()
            } catch (error) {
                console.error('Error updating team:', error);
            }
        }
    }


    return (
        <div>
            {(key)?
            <>
             <button key={key} onClick={handleOpen}>
                <EditNoteIcon />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className="box">
                    <TextField onChange={(e) => setTeamName(e.target.value)} label="Team Name" value={teamName} />
                    <button onClick={handleCreate}>{action}</button>
                </Box>
            </Modal> 
            </>:
            <button onClick={handleOpen}>Create New Match</button>
        
        }
           

            <Modal
                open={openChild}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className="box">
                    <p>
                        Are you sure you want to {action} Team
                    </p>
                    <Button onClick={postMatch}>Yes</Button>
                    <Button onClick={handleClose}>Cancel</Button>

                </Box>
            </Modal>

            <Snackbar
                open={confirm}
                autoHideDuration={60}
                onClose={handleClose}
                message={action}
            />
        </div>)
}


