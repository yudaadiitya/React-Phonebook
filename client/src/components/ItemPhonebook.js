import React from 'react';

export default function ItemPhonebook(props) {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td><button type="button" onClick={props.hapus}></button></td>
            <td><button type="button" onClick={props.edit}></button></td>
        </tr>
    );
}