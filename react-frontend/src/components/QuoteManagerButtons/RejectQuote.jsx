import { useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';


export default function RejectQuote(props) {

    const [quote, setQuote] = useState({})

    useEffect(() => {
        setQuote(props);
        
    },[props.id])

    function handleClick() {

        console.log("Rejected")
        const quoteResponse = {
            quoteId: quote.id,
            accepted: false
        }

        fetch("quote/quoteResponse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quoteResponse)
        }).then((res) =>  { 

            if(res.status === 200) { alert("Quote Rejected")}
            else { alert("Quote Not Rejected!")         
        }}).catch(err =>  console.log(err))
    }


    return (
        <Button block size="lg"
        className="Reject-Button"
        onClick={handleClick}
        >
        Reject Quote
        </Button> 
    )
}