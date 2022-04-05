import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

class MovieDocument extends Document {

  render() {

    return (
      <Html>
        <Head>
          <meta name="description" content=""/>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/>
          </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MovieDocument
