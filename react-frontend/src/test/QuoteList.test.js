import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import { Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

var axiosMock = new MockAdapter(axios);

test("/quotes renders QuoteList component When account type is U", async () => {
  // Setup
  localStorage.setItem("token", "testToken");
  axiosMock.onGet("/user/info").reply(200, { accountType: "U" });

  axiosMock.onGet(`/Quote`).reply(200, []);

  const history = createMemoryHistory();
  history.push("/quotes");

  // Action
  const { getByRole } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  // Verify
  await waitFor(() => getByRole("heading", { name: "Quotes" }));
});

test.each([["E"], ["S"], [""], [undefined]])(
  "/quotes renders Home component When account type is not U (%s)",
  async (accountType) => {
    // Setup
    localStorage.setItem("token", "testToken");
    axiosMock.onGet("/user/info").reply(200, { accountType });

    axiosMock.onGet(`/Quote`).reply(200, []);

    const history = createMemoryHistory();
    history.push("/quotes");

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
