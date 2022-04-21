import ProtectedRoute from "./ProtectedRoute";

export default function ProtectedEmployeeRoute(props) {
  return <ProtectedRoute {...props} accountType={"E"} />;
}
