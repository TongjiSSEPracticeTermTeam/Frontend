export default class User {
  id: string = ''
  displayName: string = '未登录'
  avatarUrl: string = ''
  type: 'Anonymous' | 'Customer' | 'Manager' | 'Administrator' = 'Anonymous'
}
