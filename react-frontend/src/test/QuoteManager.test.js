import { render, waitFor, getByRole, getByTestId } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import QuoteManager from '../components/QuoteManager';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

var axiosMock = new MockAdapter(axios);

test("/QuoteManager renders Item Details When Quote is selected", async () => {

    // setting token
    localStorage.setItem("token", "testToken");

    const testId = 3; // example quote id 
  
    const history = createMemoryHistory();
    
    history.push(`/quoteManager?id=${testId}`); // pushing to route
  
    // Rendering component
    const { getByText } = render(
      <Router history={history}>
        <QuoteManager /> 
      </Router>
    );

    // verifying render by searching for keyword
    await waitFor(() => getByText("Quote Details"));
});


