export function User(userInfo) {
  console.log("I am put into the store", userInfo)

  return {
    type: 'person',
    payload: userInfo
  }
}