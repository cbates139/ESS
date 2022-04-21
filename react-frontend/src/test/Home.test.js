import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import { Router } from "react-router-dom";

test("/ renders Home component", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByText("ABC Energy Limited")).toBeInTheDocument();
});
