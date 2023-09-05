export default class User {
  id: string
  displayName: string
  avatarUrl: string
  email: string
  vip:string //vip结束日期
  type: 'Anonymous' | 'Customer' | 'Manager' | 'Administrator'

  constructor() {
    this.id = ''
    this.displayName = '未登录'
    this.avatarUrl = '/img/default_user_avatar.png'
    this.email = ''
    this.vip = ''
    this.type = 'Anonymous'
  }
}
