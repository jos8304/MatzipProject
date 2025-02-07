import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '../../api/auth';
import {
  UseMutationCustomOptions,
  UsequeryCustomOptions,
} from '../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import axios from 'axios';
import {removeHearder, setHearder} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';
import {numbers, queryKey, storageKeys} from '../../constants';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHearder('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKey.AUTH, queryKey.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.AUTH, queryKey.GET_PROFILE],
      });
      // TODO: redirect to home
    },
    ...mutationOptions,
    onError: () => {
      // TODO: redirect to login
    },
  });
}

function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryKey: [queryKey.AUTH, queryKey.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHearder('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHearder('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      // TODO: redirect to login
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UsequeryCustomOptions) {
  return useQuery({
    queryKey: [queryKey.AUTH, queryKey.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationoptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHearder('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.AUTH, queryKey.GET_PROFILE],
      });
    },
    ...mutationoptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenMutation = useGetRefreshToken();
  const getProfileQuery = useGetProfile();
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
