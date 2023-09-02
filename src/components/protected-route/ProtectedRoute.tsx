import { Navigate, RouteProps, useLocation } from "react-router-dom";
import React from "react";
import { SET_USER_AUTH } from "../../services/actions/authAction";
import { checkUserAuth } from "../../services/actions/authAction";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { Payload } from "../payload/Payload";

const Protected = ({ onlyUnAuth = false, component }: { onlyUnAuth: boolean, component: JSX.Element }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: SET_USER_AUTH,
      auth: false
    });
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Payload />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

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
