export default function useUserAuth() {
  const token = localStorage.getItem('token')
  // TODO finish writing logic once Cognito is connected

  return {
    username: 'kitty',
  }
}
