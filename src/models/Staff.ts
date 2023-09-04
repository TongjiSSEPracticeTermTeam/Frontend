export default class Staff {
  staffId: string
  name: string
  gender: string
  introduction: string
  imageUrl: string

  public constructor() {
    this.staffId = ''
    this.name = ''
    this.gender = '0'
    this.introduction = ''
    this.imageUrl = ''
  }
}

export class eStaff {
  staffId: string = ''
  name: string = ''

  public constructor() {
    this.staffId = ''
    this.name = ''
  }
}
