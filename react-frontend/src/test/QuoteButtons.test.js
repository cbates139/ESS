import AcceptButton from "../components/QuoteManagerButtons/AcceptQuote";
import RejectButton from "../components/QuoteManagerButtons/RejectQuote";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

test("/accept button handler is called when button is pressed", async () => {

    // setting token
    localStorage.setItem("token", "testToken");

    // spying on the console log inside button click handler
    const consoleLogSpy = jest.spyOn(console, 'log');

    // rendering component to const 
    const component = shallow(<AcceptButton />);

    // extracting button
    const button = component.find('Button');

    // veryfing button
    expect(button.text()).toBe('Accept Quote');

    // simulating click
    button.simulate('click');
   
    // expecting the console to log accepted
    expect(consoleLogSpy).toBeCalledWith('Accepted');

});

test("/Reject Button handler is called when reject button is pressed", async () => {


    // setting token
    localStorage.setItem("token", "testToken");

    // spying on the console log inside button click handler
    const consoleLogSpy = jest.spyOn(console, 'log');

    // rendering component to const 
    const component = shallow(<RejectButton />);

    // extracting button
    const button = component.find('Button');

    // veryfing button
    expect(button.text()).toBe('Reject Quote');

    // simulating click
    button.simulate('click');
   
    // expecting the console to log rejected
    expect(consoleLogSpy).toBeCalledWith('Rejected');

});


