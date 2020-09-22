import React,{useState} from "react";
import './AddWorkersIcon.css'
import {RecentActors} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import WorkersDialog from './WorkersDialog/WorkersDialog'



function AddWorkerIcon() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return(
        <div>
            <div className='addWorker-box'>
                <div className='rightWorkerIcon' onClick={handleClickOpen}>
                    <RecentActors style={{pointerEvents:'none',marginTop:'10px' }}/>
                    <p>Add Worker</p>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}><WorkersDialog onClick={handleClose}/></Dialog>
        </div>
    )
}

export default AddWorkerIcon