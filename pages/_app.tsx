import {appWithTranslation} from "next-i18next";
import "video-react/styles/scss/video-react.scss";
import '../styles/app.scss';
import '../styles/template.scss';


function App({ Component, pageProps }) {
  return (
    <Component {...pageProps}/>
  );
}

export default appWithTranslation(App)
