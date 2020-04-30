import React, { Component } from 'react'
import List from './List';

import axios from 'axios';

class GetTorrent extends Component {

    state = {
        torrent: '',
        search:''

    }

    handleClick =  () => {
        axios.get('/gettorrent').then( response => {

            const filtreTexte = (arr, requete) => { 

                return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
              } 
            const filtre = filtreTexte(response.data, `${this.state.search}`)

            
            

            this.setState({torrent: filtre})
            //console.log(filtre);
        })
    }

    
    



    handleChange = (event) => {
        const search = event.target.value
        this.setState({search})
    }
    


    render () {

        //console.log(this.state.torrent);

        const torr = Object.keys(this.state.torrent)
    .map( key => <List key={key} details={this.state.torrent[key]} />)

        return (
            <div>
                
                <input onChange={this.handleChange} type="text"/>
                
                
                <button onClick={this.handleClick}>Get the torrent's</button>
                
                
                <div >
                    
                        {torr}
                </div>
                
            </div>
        )
    }
}

export default GetTorrent