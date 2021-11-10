class Video {
  poster: string
  source: string

  constructor (props: any = {}) {
    this.poster = props.poster
    this.source = props.source
  }
}
export class Media {
  image: string
  video: Video

  constructor (props: any = {}) {
    this.image = props.image
    this.video = props.video || new Video()
  }

}
