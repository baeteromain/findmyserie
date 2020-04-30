import React from 'react'

const List = ({details}) => {

    const destruc = details.split('=>')

    const title = destruc[0]
    const url = destruc[1]

   
    return (
        <div>
            <ul>
                <li>{title} : <a href={url}>{url}</a>
                </li>
            </ul>
        </div>
    )
}

export default List