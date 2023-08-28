export default class Movie {
  movieId: string
  name: string
  duration: string
  instruction: string | null
  score: number | null
  postUrl: string | null
  tags: string | null
  releaseDate: string | null
  removalDate: string | null

  public constructor (data:{movieId:string ,name:string ,duration:string ,instruction:string | null ,score:number | null ,postUrl:string | null ,tags:string | null ,releaseDate:string | null ,removalDate:string | null}) {
    this.movieId = data.movieId
    this.name = data.name
    this.duration = data.duration
    this.instruction = data.instruction || ''
    this.score = data.score || 0
    this.postUrl = data.postUrl || ''
    this.tags = data.tags || ''
    this.releaseDate = data.releaseDate
    this.removalDate = data.removalDate
  }
}
