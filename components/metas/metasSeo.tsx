import {MetasSeoProps} from '@interfaces/metasSeoProps';
import Head from 'next/head';


export function MetasSeo(props: {metas: MetasSeoProps}) {
  let {metas} = props;

  return (
    <Head>
      <meta charSet="utf-8"/>
      <title>{metas.title}</title>
      <meta name="robots" content="index,nofollow"/>
      <meta name="author" content="Remotion"/>
      <meta name="title" content={metas.metaTitle}/>
      <meta name="description" content={metas.metaDescription}/>
    </Head>
  );
}
