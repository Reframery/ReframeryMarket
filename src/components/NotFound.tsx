import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <div>
      <h1>Resource not found at {location.pathname}</h1>
    </div>
  );
}
