export function logOut(logoutFunction) {

  return {
    type: 'logOut',
    payload: logoutFunction
  }
}