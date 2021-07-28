export function getUserId({ store }) {
  if (store) {
    getUserId.store = store;
  } else if (getUserId.store) {
    const store = getUserId.store.getState();
  }
}
