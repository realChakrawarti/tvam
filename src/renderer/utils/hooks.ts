import HttpStatusCode from '@/common/httpStatusCode';
import { Channel } from '@/common/channel';
import { useEffect } from 'react';
import useUserStore from '../store/user';
import DbApi from './api';

export function useGetLocalStorage(key: string) {
    return JSON.parse(window.localStorage.getItem(key) || '[]');
}

export function useSetLocalStorageUsers() {
    const { setUsers } = useUserStore();

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await DbApi.invoke(Channel.GET_ALL_USERS);
            if (response.status === HttpStatusCode.OK) {
                const users = response.data;
                window.localStorage.setItem('allUsers', JSON.stringify(users));
                setUsers(users);
            }
        };

        getAllUsers();
    }, [setUsers]);
}
