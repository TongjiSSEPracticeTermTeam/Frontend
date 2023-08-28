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

  public constructor() {
    this.movieId = ''
    this.name = ''
    this.duration = ''
    this.instruction = null
    this.score = null
    this.postUrl = null
    this.tags = null
    this.releaseDate = null
    this.removalDate = null
  }
}
