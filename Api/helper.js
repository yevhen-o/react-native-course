export function getUserId(arg = {}) {
  if (arg.store) {
    getUserId.store = arg.store;
    return arg.store.getState();
  }
  if (getUserId.store) {
    const store = getUserId.store.getState();
    return ((((store || {}).shop || {}).userLoginState || {}).data || {})
      .localId;
  }
  return undefined;
}
