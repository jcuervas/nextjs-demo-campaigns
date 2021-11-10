export class LegalInfo {
  html: string
  fileUrl: string
  fileName: string

  constructor (props: any = {}) {
    this.html = props.html
    this.fileUrl = props.fileUrl
    this.fileName = props.fileName
  }
}
