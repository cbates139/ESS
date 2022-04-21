import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import { Router } from "react-router-dom";

test("/login renders login component", () => {
  const history = createMemoryHistory();
  history.push("/login");
  const { getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByLabelText("Username")).toBeInTheDocument();
});
