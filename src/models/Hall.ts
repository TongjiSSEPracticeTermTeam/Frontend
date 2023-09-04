export default class Halll {
    hallID: string
    cinemaID: string
    type: string
    seat: {
        rows: number
        cols: number[]
    }

    public constructor(data?: {
        hallID: string
        cinemaID: string
        type: string
        seat: {
            rows: number
            cols: number[]
        }
    }) {
        if (data) {
            this.hallID = data.hallID
            this.cinemaID = data.cinemaID
            this.type = data.type
            this.seat = data.seat
        }
        else {
            this.hallID = ''
            this.cinemaID = ''
            this.type = ''
            this.seat = {
                rows: 0,
                cols: []
            }
        }
    }
}
