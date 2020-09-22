import React,{useState} from "react";
import {SupervisedUserCircle} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import '../../Clients/AddClient/AddClientIcon.css'
import AddCompanyDialog from "./AddCompanyDialog/AddCompanyDialog";


function AddCompanyIcon() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return(
        <div>
            <div className='addClient-box'>
                <div className='rightClientIcon' onClick={handleClickOpen}>
                    <SupervisedUserCircle style={{marginTop:'10px'}}/>
                    <p>Add Company</p>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}><AddCompanyDialog/></Dialog>
        </div>
    )
}

export default AddCompanyIcon