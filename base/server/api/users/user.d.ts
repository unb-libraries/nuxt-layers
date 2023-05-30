interface User {
  username: string
  email: string
  active?: boolean
}
type UserCollection = {[key: string]: User}