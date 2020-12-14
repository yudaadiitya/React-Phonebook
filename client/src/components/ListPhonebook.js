import React from 'react'
import ItemPhonebook from './ItemPhonebook'


export default function ListItem(props) {
    const listNode = props.data.map((item, index) => <ItemPhonebook
        index = {index}
        key={item.id}
        id={item.id}
        name={item.name}
        phone={item.phone}
        hapus={() => props.remove(item.id)}
        edit={() => props.edit(item.id, item.name, item.phone)} />)
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listNode}
            </tbody>
        </table>
    )
}