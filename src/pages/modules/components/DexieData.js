import 'dexie-observable';
import Dexie from 'dexie';

export function generateQuery(data) {
  return {
    messages: {
      all: (filter) =>
        data.messages
          .orderBy('createdAt')
          .reverse()
          .filter((message) => {
            if (filter) return filter(message);

            return true;
          })
          .toArray(),
      lastSync: () =>
        data.messages
          .orderBy('syncId')
          .filter((message) => message.syncId !== undefined && message.syncId !== null)
          .last(),
    },
    ctypes: {
      all: () => data.ctype.toArray(),
    },
    credential: {
      all: (filter) =>
        data.credential
          .orderBy('updateTime')
          .reverse()
          .filter((credential) => {
            if (filter) return filter(credential);

            return true;
          })
          .toArray(),
      one: (rootHash) => data.credential.where({ rootHash }).first(),
    },
  };
}

export function generateWrite(data) {
  return {
    messages: {
      read: async (messageId) => {
        await (messageId &&
          data.messages.where('messageId').equals(messageId).modify({
            isRead: 1,
          }));
      },
      put: async (message) => {
        await data.messages.put(message);
      },
      batchPut: async (messages) => {
        await data.messages.bulkPut(messages);
      },
    },
    ctypes: {
      put: async (ctype) => {
        await data.ctype.put(ctype);
      },
      batchPut: async (ctypes) => {
        await data.ctype.bulkPut(ctypes);
      },
      delete: async (hash) => {
        await data.ctype.delete(hash);
      },
    },
    credential: {
      put: async (credential) => {
        await data.credential.put(credential);
      },
      batchPut: async (credentials) => {
        await data.credential.bulkPut(credentials);
      },
      delete: async (rootHash) => {
        await data.credential.delete(rootHash);
      },
    },
  };
}

export class DexieData extends Dexie {
  constructor(name) {
    super(`credential-db-${name}`);
    this.version(2).stores({
      ctype: '&hash, owner, *schema, description, type',
      messages:
        '&messageId, syncId, isRead, createdAt, *body, sender, receiver, receivedAt, inReplyTo, *references',
      credential:
        '&rootHash, owner, attester, ctypeHash, updateTime, requestTime, attestedTime, version, source, *request, *credential',
    });
  }
}

const data = new DexieData();
data.open();

export default data;