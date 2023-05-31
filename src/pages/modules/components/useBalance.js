import { Balance } from '@kiltprotocol/sdk-js';
import { useEffect, useState } from 'react';

export function useBalance(account) {
  const [balance, setBalance] = useState();

  useEffect(() => {
    let unsub;
    console.log('Unsub: ', unsub);
    console.log('Account: ', account);

    if (account) {
      console.log('Checking Balance')
      Balance.listenToBalanceChanges(account, (_, balances) => {
        console.log('Balance: ', balances)
        setBalance(balances);
      }).then(unsubscribe => unsubscribe)
        .then(unsubscribe => (unsub = unsubscribe));
    }

    return () => {
      console.log('Unsub 2: ', unsub);
      unsub?.();
    };
  }, [account]);

  return balance;
}