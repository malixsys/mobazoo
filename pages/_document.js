/* eslint-disable jsx-a11y/html-has-lang */
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

const createBodyStyle = () => (
// eslint-disable-next-line max-len
    { __html: 'body,body>div:first-child,body>div:first-child>div:first-child,body>div:first-child>div>div,html{height:100%}.MainContent{height:calc(100% - 66px)}@media only screen and (min-width:767px){.ui.container.MainContent{width:calc(100% - 150px)!important;margin:0!important}}' }
);
export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const { html, head, errorHtml, chunks } = renderPage();
        const styles = flush();
        return { html, head, errorHtml, chunks, styles };
    }

    render() {
        return (
            <html>
                <Head>
                    <title>Mobazoo</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta
                        name="description"
                        content="Next.js 3.0 starter project with React/Redux and Auth"
                    />
                    <link
                        rel="stylesheet"
                        href="/static/antd.css"
                    />
                    <link
                        rel="stylesheet"
                        href="/static/main.css"
                    />
                    <style dangerouslySetInnerHTML={createBodyStyle()} />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
