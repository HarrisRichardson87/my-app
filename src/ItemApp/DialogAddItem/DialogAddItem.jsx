import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Alert, Button , DialogActions } from '@mui/material/';
import { ItemObject } from '../ItemList';
export default class DialogAddItem extends Component {
    state = {
        name:"", 
        error:null
    };

    handleInput = (e) => {
        // turn off error if user started inputing text
        if(e.target.value !== "")
            this.setState({ error: null });
        this.setState({ name: e.target.value});
    }

    handleSave = () => {
        const name = this.state.name;

        // Input is blank
        if(name === ""){
            // User attempted to save with no input block this action
            this.setState({ error : "Input cannot be blank"});
            return;
        }

        // Pass the new item
        this.props.onAdd( new ItemObject(name));

        // Close the Dialog
        this.props.onClose();
    }

    showError(){
        const { name, error } = this.state;
        
        // User tried to save blank and input is still blank
        return error && name === "";
    }

    render() {
        const { open, onClose } = this.props;
        const { name, error } = this.state;
        return (
            <Dialog open={open}>
                <DialogTitle>Add Item to your list</DialogTitle>
                <DialogContent>
                    { this.showError() && <Alert severity='error'>{error}</Alert>}
                    <TextField placeholder='Type item name here' variant="filled" value={name} onChange={this.handleInput}/>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={this.handleSave}>Add</Button>
                    <Button variant='outlined'  onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
