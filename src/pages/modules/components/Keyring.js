import { Keyring as PolkadotKeyring } from '@polkadot/ui-keyring';

export class Keyring extends PolkadotKeyring {
    constructor(injected){
        super();
        this.loadAll({ ss58Format: 38 }, injected);
    }
    
    async sign({ alg, data, publicKey }) {
        const pair = this.getPair(publicKey);
        const signature = pair.sign(data, { withType: false });
        return Promise.resolve({ alg, data: signature });
    }
}