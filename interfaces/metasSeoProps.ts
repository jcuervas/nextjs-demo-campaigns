export class MetasSeoProps {
  metaDescription: string;
  metaTitle: string;
  title: string;

  constructor (props: any = {}) {
    this.metaDescription = props.metaDescription;
    this.metaTitle = props.metaTitle;
    this.title = props.title;
  }
}
