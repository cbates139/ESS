import ProtectedRoute from "./ProtectedRoute";

export default function ProtectedUserRoute(props) {
  return <ProtectedRoute {...props} accountType={"U"} />;
}
