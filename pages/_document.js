import Document, { Html, Head, Main, NextScript } from "next/document";

class MainDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body style={{"background-color":"black"}}>
        <center>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
          </center>
        </body>
      </Html>
    );
  }
}

export default MainDocument;