import React, { Component } from 'react';
import { TableRow, TableCell } from '@mui/material';
import styles from "./Item.module.css";
export default class Item extends Component {
    handleClick = (e) => {
        this.props.onSelect(this.props.index);
    }
    getCssClass(){
        // Line is in select blue
        if(this.props.isSelected)
            return styles.selected;
        return styles.item; // Normal line css
    }
    render() {
    const { item } = this.props;
        return (
            <TableRow className={this.getCssClass()}>
                <TableCell onClick={this.handleClick}>{item.name}</TableCell>
            </TableRow>
        )
    }
}