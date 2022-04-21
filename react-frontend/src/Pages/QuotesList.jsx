import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Quote from '../components/Quote'
import QuoteManager from '../components/QuoteManager';

export default function QuotesList() {

    const [selectedQuote, setSelectedQuote] = useState({})
    const [quotes, setQuotes] = useState([])
    const [isSelected, setSelected] = useState(false);
    
    useEffect(() => {
        axios.get('/Quote',{
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }}).then((res) => {
            console.log(res.data);
            setQuotes(res.data);
        }).catch()
    },[])

    function getQuote(quoteData) {
            // passback function to recieve quote data from component
            setSelectedQuote(quoteData);
            setSelected(true) // selling selected state to true, so the quote manager can be displayed
    }

    function DisplayManager() {
        if(isSelected === true)
        {
            return (<QuoteManager {...selectedQuote} /> )
        } else { return( <div> </div>)}
    }

    return (
        <div className="Component">
                     <head> <meta http-equiv="Content-Security-Policy" content=" style-src 'self'; base-uri 'self'; img-src https: data:;"></meta></head>
            <h4>Quotes</h4>
            <div className="RequestTable">                    
                <Table responsive striped bordered hover size="sm">
                    <thead style={{backgroundColor: '#f76540'}}>
                        <tr>
                            <th>ID</th>
                            <th>ItemID</th>
                            <th>Request Sender</th>
                            <th>Cost</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //mapping over filtered tickets and displaying ticket rows, and passing callback function as a prop
                            quotes.map((quote, key) => {
                                return <Quote key={key} sendQuote={getQuote} {...quote}/>
                            })
                        }
                    </tbody>
                </Table>    
            </div>
            {/*Conditional Rendering for the Quote Manager */}
            <DisplayManager />       
        </div>   
    )
}