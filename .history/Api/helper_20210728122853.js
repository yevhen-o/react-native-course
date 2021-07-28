export function getUserId({ store }) {
  if (store) {
    getUserId.store = store;
    return store.getState();
  }
  if (getUserId.store) {
    const store = getUserId.store.getState();
    return ((((store || {}).shop || {}).userLoginState || {}).data || {})
      .localId;
  }
  return undefined;
}
