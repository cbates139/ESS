import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import { Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

var axiosMock = new MockAdapter(axios);

test("/quoteRequests renders QuoteRequestList component When account type is E", async () => {
  // Setup
  localStorage.setItem("token", "testToken");
  axiosMock.onGet("/user/info").reply(200, { accountType: "E" });

  axiosMock.onGet(`/quoteRequest`).reply(200, []);

  const history = createMemoryHistory();
  history.push("/quoteRequests");

  // Action
  const { getByRole } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  // Verify
  await waitFor(() => getByRole("heading", { name: "Quote Requests" }));
});

test.each([["U"], ["S"], [""], [undefined]])(
  "/quoteRequests renders Home component When account type is not E (%s)",
  async (accountType) => {
    // Setup
    localStorage.setItem("token", "testToken");
    axiosMock.onGet("/user/info").reply(200, { accountType });

    axiosMock.onGet(`/quoteRequest`).reply(200, []);

    const history = createMemoryHistory();
    history.push("/quoteRequests");

    // Action
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    // Verify
    await waitFor(() => getByText("ABC Energy Limited"));
  }
);
