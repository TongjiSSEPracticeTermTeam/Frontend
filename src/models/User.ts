export default class User {
  id: string
  displayName: string
  avatarUrl: string
  type: 'Anonymous' | 'Customer' | 'Manager' | 'Administrator'

  constructor() {
    this.id = ''
    this.displayName = '未登录'
    this.avatarUrl = '/img/default_user_avatar.png'
    this.type = 'Anonymous'
  }
}
