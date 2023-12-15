import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHelper from '../../components/auth/apis/helper';
import {
  removeAuthentication, removeUser,
} from '../../utils/reduxSlice/appSlice';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

// This hook syncs the redux data with local storage
export const useUpdateLocalStore = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const user = useTypedSelector((store) => store.app.user);

  useEffect(() => {
    if (user) {
      if (Object.values(user).length > 1) {
        AuthHelper.updateAuthenticatedUserData(user);
      }
    } else {
      AuthHelper.clearSignedOnData(() => {
        dispatch(removeUser());
        dispatch(removeAuthentication());
        navigate('/auth');
      });
    }
  }, [user]);
};

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthHelper from '../../components/auth/apis/helper';
// import {
//   addUser, confirmAuthentication, removeAuthentication, removeUser,
// } from '../../utils/reduxSlice/appSlice';
// import { useTypedDispatch, useTypedSelector } from './reduxHooks';

// // export const useUpdateReduxStore = () => {
// //   const dispatch = useTypedDispatch();
// //   const navigate = useNavigate();
// //   const isSignedOn = useTypedSelector((store) => store.app.authenticated);
// //   useEffect(() => {
// //     const data = AuthHelper.isSignedOn();

// //     if (data && Object.keys(data).length > 1) {
// //       dispatch(addUser(data));
// //       dispatch(confirmAuthentication(true));
// //     }
// //     if (!data && isSignedOn) {
// //       AuthHelper.clearSignedOnData(() => {
// //         dispatch(removeUser());
// //         dispatch(removeAuthentication());
// //         navigate('/auth');
// //       });
// //     }
// //   }, []);
// // };
