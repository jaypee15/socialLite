import React from 'react';
import { account } from '../appwrite/appwriteConfig';
import { useRoutes } from 'react-router-dom';
import { FETCH_STATUS } from '../utils/constants';


export default function useUser() {
  const [currentAccount, setCurrentAccount] = React.useState();
  const [accountStatus, setAccountStatus] = React.useState(
    FETCH_STATUS.LOADING
  );
  const route = useRoutes();

  const getSession = async () => {
    setAccountStatus(FETCH_STATUS.LOADING);

    const promise = account.get();
    let currentAccount = null;

    try {
      currentAccount = await promise;
      setAccountStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.log(error);
      setAccountStatus(FETCH_STATUS.FAIL);
    } finally {
      setCurrentAccount(currentAccount);
    }
  };

  const logout = async () => {
    const promise = await account.deleteSession('current');
    setCurrentAccount(null)
    route.push('/signin')
  };

  React.useEffect(() => {
    getSession();
  }, []);

  return {
    currentAccount,
    isLoadingAccount: accountStatus === FETCH_STATUS.LOADING,
    logout,
  };
}