import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>404 Error</h1>
      <h4>Sorry, the page you are looking for is not found</h4>
      <Link to="/messages">Go back to home page</Link>
    </>
  );
};

export default NotFound;
