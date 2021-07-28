export function getUserId({ storage }) {
  if (storage) {
    getUserId.storage = storage;
  } else if (getUserId.storage) {
    const state = getUserId.storage.getState();
  }
}
