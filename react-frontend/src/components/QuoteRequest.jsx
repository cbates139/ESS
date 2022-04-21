import React from "react";


const QuoteRequest = (props) => {
    
  // callback function that will set the appropriate quote request data for the quote request 
  function handleClick() {
    props.sendQuoteRequest(props);
  }

  function StatusCell() {
    switch(props.status) {
       case 'PENDING':
         return (
           <td style={{backgroundColor: '#D0312D'}}>{props.status}</td>
         )
         
       case 'PROCESSED':
           return (
             <td style={{backgroundColor: '#FCAE1E'}}>{props.status}</td>
           )
       case 'ACCEPTED':
         return (
           <td style={{backgroundColor: '#4CBB17'}}>{props.status}</td>
         )
       default: 
       return (
        <td style={{backgroundColor: '#D0312D'}}>No Status</td>
      )
    }
 }

   return (
     <tr>
         <td>{props.id}</td>
         <td><span onClick={handleClick}><code>{props.itemId}</code></span></td>
         <td>{props.username}</td>
         <StatusCell />
    </tr>
  );
};
export default QuoteRequest;