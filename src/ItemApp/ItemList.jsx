import Button from '@mui/material/Button';
import React, { Component } from 'react'
import Item from './Item/Item';
import Table from '@mui/material/Table';
import styles from "./ItemList.module.css";
import DialogAddItem from './DialogAddItem/DialogAddItem';

export class ItemObject{
    constructor(name){
        this.name = name;
    }
}
export default class FileName extends Component {
    state={
        items: [
            new ItemObject("Item 1"),
            new ItemObject("Item 2"),
            new ItemObject("Item 3"),
        ], 
        selectedItemIndex:0,
        lastDeletedItem: null,
        lastItemDeletedIndex: -1,
        openAddDialog: false
    }

    handleSelect = (selectedItemIndex) => {
        // Update Selected Index
        this.setState({ selectedItemIndex });
    }

    handleDelete = () => {
        // Use the selected index
        const { selectedItemIndex } = this.state;

        // Copy the list
        const items = [...this.state.items];

        // Save for undo
        this.saveLastDeletedItem(items[selectedItemIndex], selectedItemIndex);

        // Remove Clicked item
        items.splice(selectedItemIndex, 1); // Removes at index 1 item in array

        // Update Items
        this.setState({ items, selectedItemIndex: this.getNextIndex(selectedItemIndex) });
    }

    getNextIndex(deletedItemIndex){
        // If we deleted the first Item keep at the first item
        if(deletedItemIndex === 0)
            return deletedItemIndex;
        return deletedItemIndex - 1; // if not go to next index down
    }

    saveLastDeletedItem(lastDeletedItem, lastItemDeletedIndex){
        // If undo button clicked we insert it back in its former spot in the list
        this.setState({ lastDeletedItem, lastItemDeletedIndex });
    }

    handleUndoDelete = () => {
        // Use the deleted items index
        const { lastItemDeletedIndex } = this.state;
        const lastDeletedItem = {...this.state.lastDeletedItem};

        // Copy the list
        const items = [...this.state.items];

        // Put last deleted item back in the list at correct spot
        items.splice(lastItemDeletedIndex, 0, lastDeletedItem); 

        // Update Items and reset last deleted item
        this.setState({ items, lastItemDeletedIndex: -1, lastDeletedItem: null });
    }

    handleOpenAddDialog = () =>{
        this.setState({ openAddDialog: true });
    }
    handleCloseAddDialog = () =>{
        this.setState({ openAddDialog: false });
    }
    handleAddItem  = (item) =>{
        // Copy the list
        const items = [...this.state.items];

        // Add item to your list
        items.push(item); 

        // Update Items
        this.setState({ items });
    }
    render() {
        const { items, selectedItemIndex, openAddDialog, lastItemDeletedIndex } = this.state;
        return(
            <div className={styles.itemList}>
                <Table>
                    { items.map((x, i) => <Item index={i} item={x} onSelect={this.handleSelect} isSelected={selectedItemIndex === i}/> )}
                </Table>
                <div className={styles.buttonGroup}>
                    <div className={styles.buttonsDelete}>
                        <Button disabled={lastItemDeletedIndex === -1} variant='outlined'  onClick={this.handleUndoDelete}> Undo </Button>
                        <Button variant='outlined'  onClick={this.handleDelete}> Delete </Button>
                    </div>
                    <div className={styles.buttonsAdd}>
                        { openAddDialog && <DialogAddItem 
                                            open={openAddDialog} 
                                            onClose={this.handleCloseAddDialog} 
                                            onAdd={this.handleAddItem}/>
                        }
                        <Button variant='contained' onClick={this.handleOpenAddDialog}> ADD </Button>
                    </div>
                </div>
            </div>
        ) 
    }
}