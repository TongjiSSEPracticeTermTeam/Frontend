export default class Cinema {
  cinemaId: string
  location: string
  name: string
  managerId: string
  cinemaImageUrl: string
  _feature: string

  public constructor() {
    this.cinemaId = ''
    this.location = ''
    this.name = ''
    this.managerId = ''
    this.cinemaImageUrl = ''
    this._feature = ''
  }

  public get feature(): string[] {
    return this._feature.split(',')
  }

  public set feature(value: string[]) {
    this._feature = value.join(',')
  }
}
