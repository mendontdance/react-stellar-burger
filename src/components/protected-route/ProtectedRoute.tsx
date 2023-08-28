import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { SET_USER_AUTH } from "../../services/actions/authAction";
import { checkUserAuth } from "../../services/actions/authAction";
import { RootState } from "../../services/reducers/rootReducer";
import { TRawUser } from "../../services/types";
import { useDispatch, useSelector } from "../../services/types/hooks";

const Protected = ({ onlyUnAuth = false, component }: { onlyUnAuth: boolean, component: any }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: SET_USER_AUTH,
      auth: false
    });
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked: boolean = useSelector((store: RootState) => store.user.isAuthChecked);
  const user: TRawUser = useSelector((store: RootState) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
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

export const OnlyAuth = (props: any) => <Protected onlyUnAuth={false} {...props} />;
export const OnlyUnAuth = (props: any) => <Protected onlyUnAuth={true} {...props} />;
