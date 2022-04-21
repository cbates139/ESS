import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import { Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

var axiosMock = new MockAdapter(axios);

test("/catalogueItem renders CatalogueItem component When account type is U", async () => {
  // Setup
  localStorage.setItem("token", "testToken");
  axiosMock.onGet("/user/info").reply(200, { accountType: "U" });

  var id = "test";
  axiosMock.onGet(`/CatalogItem/${id}`).reply(200, {});

  const history = createMemoryHistory();
  history.push(`/catalogueItem?id=${id}`);

  // Action
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  // Verify
  await waitFor(() => getByText("Request Quote"));
});

test.each([["E"], ["S"], [""], [undefined]])(
  "/catalogueItem renders Home component When account type is not U (%s)",
  async (accountType) => {
    // Setup
    localStorage.setItem("token", "testToken");
    axiosMock.onGet("/user/info").reply(200, { accountType });

    var id = "test";
    axiosMock.onGet(`/CatalogItem/${id}`).reply(200, {});

    const history = createMemoryHistory();
    history.push(`/catalogueItem?id=${id}`);

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
