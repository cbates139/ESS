import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {Button} from 'react-bootstrap';

export default function CatalogueItem(props) {
    const history = useHistory();
    const [item, setItem] = useState({});
 
    useEffect(() => {

        setItem(props)
        const urlParams = new URLSearchParams(props.location.search); //parameters sent through url
        const id = urlParams.get('id'); // ItemId

        //get catalogue item from backend
        axios.get(`CatalogItem/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {
                setItem(response.data);
            })  
        .catch(err => history.push('/login'))

    },[])
    
    function RequestQuote() {
        const itemId ={
            itemId: item.id
        }

        console.log(JSON.stringify(itemId))
        fetch('quoteRequest', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(itemId)
        }).then((res) => {

            if(res.status === 200) { alert("Request Created")}
            else { alert("Requested Not Created!")}
            props.history.push("catalogue");

        }).catch(err =>  console.log(err))
    }

    return (
        <div className='Component'>
                <head> <meta http-equiv="Content-Security-Policy" content=" style-src 'self'; base-uri 'self'; img-src https: data:;"></meta></head>            
            <div className="RequestWrapper">
            <h4>{item.name}</h4>
                    <div className="ItemInfo">
                        <p>{item.description}</p>
                        <p>{item.itemCost}</p>
                    </div>
                    <div className="ImageBox">
                        <img src={item.imageUrl} alt={item.name}></img>
                        <Button block size="lg" 
                        onClick={RequestQuote}
                        >Request Quote
                        </Button>
                    </div>
            </div>
        </div> 
    )
}