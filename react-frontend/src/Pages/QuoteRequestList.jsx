import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import QuoteRequestManager from '../components/QuoteRequestManager'
import QuoteRequest from '../components/QuoteRequest';

export default function QuoteRequestList(props) {

    const [quoteRequests, setQuoteRequests] = useState([])
    const [quoteRequest, setQuoteRequest] = useState({})
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        axios.get("quoteRequest", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response);
            setQuoteRequests(response.data);
        })
        .catch(err => console.log(err))
    },[])

    // call back function that sets the quote request that has been selected
    function getQuoteRequest(data) {
        
        setQuoteRequest(data);
        setSelected(true);
    }

    function DisplayManager()
    {
        if(isSelected === true) { return (<QuoteRequestManager {...quoteRequest}/>) } 
        else { return (<div></div>)}
    }

    return (
        <div className="Component">
            <head> <meta http-equiv="Content-Security-Policy" content=" style-src 'self'; base-uri 'self'; img-src https: data:;"></meta></head>
            <h4>Quote Requests</h4>
        <div className="RequestTable">                    
            <Table responsive striped bordered hover size="sm">
                <thead style={{backgroundColor: '#f76540'}}>
                    <tr>
                        <th>ID</th>
                        <th>ItemID</th>
                        <th>Request Sender</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //mapping over filtered tickets and displaying ticket rows, and passing callback function as a prop
                        quoteRequests.map((quoteRequest, key) => {
                            return <QuoteRequest key={key} sendQuoteRequest={getQuoteRequest} {...quoteRequest}/>
                        })
                    }
                </tbody>
            </Table>    
        </div>
        {/*Conditional Rendering for quote request manager */}
        <DisplayManager />
        </div>   
    )
}
