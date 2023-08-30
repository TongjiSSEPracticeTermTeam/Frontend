export default class Cinema {
  cinemaId: string
  location: string
  name: string
  managerId: string
  cinemaImageUrl: string
  feature: string

  public constructor() {
    this.cinemaId = ''
    this.location = ''
    this.name = ''
    this.managerId = ''
    this.cinemaImageUrl = ''
    this.feature = ''
  }

  // public get feature(): string[] {
  //   console.log(this._feature.length)
  //   let ret: string[];
  //   if (this._feature.length > 0) {
  //     ret = this._feature.split(',')
  //     // return this._feature.split(',')
  //   }
  //   else
  //     ret = []
  //   console.log(ret)
  //   return ret
  // }

  // public set feature(value: string[]) {
  //   this._feature = value.join(',')
  // }
}

export class CinemaCreator extends Cinema {
  managerName: string
  managerPassword: string
  managerEmail: string

  public constructor() {
    super()
    this.cinemaId = '系统自动生成'
    this.managerName = ''
    this.managerPassword = ''
    this.managerEmail = ''
  }
}