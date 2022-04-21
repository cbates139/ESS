import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import { Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

var axiosMock = new MockAdapter(axios);

test("/catalogue renders Catalog component When account type is U", async () => {
  // Setup
  localStorage.setItem("token", "testToken");
  axiosMock.onGet("/user/info").reply(200, { accountType: "U" });

  axiosMock.onGet("/CatalogItem").reply(200, []);

  const history = createMemoryHistory();
  history.push("/catalogue");

  // Action
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  // Verify
  await waitFor(() => getByText("ABC Catalog"));
});

test.each([["E"], ["S"], [""], [undefined]])(
  "/catalogue renders Home component When account type is not U (%s)",
  async (accountType) => {
    // Setup
    localStorage.setItem("token", "testToken");
    axiosMock.onGet("/user/info").reply(200, { accountType });

    axiosMock.onGet("/CatalogItem").reply(200, []);

    const history = createMemoryHistory();
    history.push("/catalogue");

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
