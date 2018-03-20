export function User(userEmail) {
  console.log("I am put into the store", userEmail)

  return {
    type: 'person',
    payload: userEmail
  }
}