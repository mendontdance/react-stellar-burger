import { Navigate, RouteProps, useLocation } from "react-router-dom";
import React from "react";
import { SET_USER_AUTH } from "../../services/actions/authAction";
import { checkUserAuth } from "../../services/actions/authAction";
import { useDispatch, useSelector } from "../../services/types/hooks";
<<<<<<< HEAD
import { Payload } from "../payload/Payload";

const Protected = ({ onlyUnAuth = false, component }: { onlyUnAuth: boolean, component: JSX.Element }) => {
=======

const Protected = ({ onlyUnAuth = false, component }: { onlyUnAuth: boolean, component:JSX.Element}) => {
>>>>>>> main
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: SET_USER_AUTH,
      auth: false
    });
    dispatch(checkUserAuth());
  }, [dispatch]);

<<<<<<< HEAD
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
=======
  const isAuthChecked: boolean = useSelector((store) => store.user.isAuthChecked);
>>>>>>> main
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
<<<<<<< HEAD
    return <Payload />;
=======
    return null;
>>>>>>> main
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
<<<<<<< HEAD
    return <Navigate to={from} />;
  }

=======
    if (location.state.from.pathname === '/orders') {
      return <Navigate to={'/profile'}/>
    }
    return <Navigate to={from} />;
  }
  
>>>>>>> main
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

type T = {
  component: JSX.Element
}

export const OnlyAuth = (props: T) => <Protected onlyUnAuth={false} {...props} />;
export const OnlyUnAuth = (props: T) => <Protected onlyUnAuth={true} {...props} />;
