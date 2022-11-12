import {useEffect, useState} from 'react';
import {getStarknet} from '@starkware-industries/commons-js-libs/get-starknet';

export const useStarknetAddress = () => {
    const [address, setAddress] = useState('');

    useEffect(async () => {
        const account = await getStarknet().enable({showModal: false});

        if (account?.length) {
            setAddress(account[0]);
        }
    }, []);

    return address;
};
