import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import axios from 'axios';


export default function Nav(props) {


    const [userInfo, setInfo] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        axios.get('user/info',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((response) => {
                console.log("Nav Effect: "+ response.data)
                setInfo(response.data);
            })  
        .catch(err => console.log(err))

        // gets updated user info when new user logs in
        // However this props.user RESET when page is refreshed.. as no data has been set from login
    }, [props.user])


    // Front End Routes
    function Login() {
        props.history.push("login");
    }
    function SignUp() {
        props.history.push("signup");
    }
    function QuoteRequests() {
        props.history.push("quoteRequests");
    }
    function Quotes() {
        props.history.push("quotes")
    }
    function Dashboard() {
        props.history.push("dashboard")
    }
    

    function SignOut() {
        // deleting the token when user signs out
        localStorage.removeItem('token');
        setInfo({});
        props.history.push("/")
    }

    function EmpNav() {
        return (

            <div className="col text-right my-auto">
                <Button
                    variant="secondary"
                    onClick={SignOut}
                >Signout</Button>

                <Button
                    variant="secondary"
                    onClick={QuoteRequests}
                >Quote Requests</Button>
            </div>
        )
    }

    function UserNav() {
        return (
            <div className="col text-right my-auto">
              
                <Button
                    variant="secondary"
                    onClick={SignOut}
                >Signout</Button>

                <Button
                    variant="secondary"
                    onClick={Quotes}
                >Quotes
                </Button>

                <Button
                    variant="secondary"
                    onClick={Dashboard}
                >Dashboard
                </Button>
            </div>
        )
    }

    function VisitNav() {
        return (
            <div className="col text-right my-auto">

                <Button
                    variant="primary"
                    className="mr-2"
                    onClick={Login}
                >Login</Button>

                <Button variant="secondary" onClick={SignUp} >Sign Up</Button>
            </div>
        )
    }

    //switch to display the correct Nav for the user type
    function DisplayNav() {
        switch (userInfo.accountType) {
            case 'E':
                return (<EmpNav />)

            case 'U':
                return (<UserNav />)

            default:
                return (<VisitNav />)
        }
    }

    return (
        <div className="Nav row m-3">
            <svg id="Logo">
                <a href='/'>
                <circle cx={30} cy={30} r={30} fill="#f76540" />
                </a>
            </svg>
            <DisplayNav />
        </div>
    )
}
