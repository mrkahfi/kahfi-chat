import { Route } from 'react-router-dom';

const ProtectedRoute = ({ ...rest }) => {
  return <Route {...rest} />;
};

export default ProtectedRoute;
