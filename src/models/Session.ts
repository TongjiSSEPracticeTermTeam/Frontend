export default class Session {
    movieId: string
    cinemaId: string
    hallId: string
    startTime: Date
    attendence: number
    price: number

    public constructor(data?: {
        movieId: string
        cinemaId: string
        hallId: string
        startTime: Date
        attendence: number
        price: number
    }) {
        if (data) {
            this.movieId = data.movieId ? data.movieId : ''
            this.cinemaId = data.cinemaId ? data.cinemaId : ''
            this.hallId = data.hallId ? data.hallId : ''
            this.startTime = data.startTime ? data.startTime : new Date()
            this.attendence = data.attendence ? data.attendence : 0
            this.price = data.price ? data.price : 0
        }
        else {
            this.movieId = ''
            this.cinemaId = ''
            this.hallId = ''
            this.startTime = new Date()
            this.attendence = 0
            this.price = 0
        }
    }
}