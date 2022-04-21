import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import { Router } from "react-router-dom";

test("/signup renders SignUp component", () => {
  const history = createMemoryHistory();
  history.push("/signup");
  const { getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByLabelText("First Name")).toBeInTheDocument();
});
