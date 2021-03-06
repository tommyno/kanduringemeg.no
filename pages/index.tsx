import Head from "next/head";

import CallForm from "components/CallForm";

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Kan du ringe meg?</title>
        <meta
          name="description"
          content="Få hjelp når telefonen ligger gjemt i sofaen eller jakkelomma."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://kanduringemeg.no/illustration.svg"
        />
      </Head>

      <section className="wrap">
        <h1>Kan du ringe meg?</h1>

        <div>
          <CallForm />
          <img
            src="/illustration.png"
            alt="Detektiv med forstørrelsesglass og hund"
            className="illustration"
          />
        </div>

        <footer>
          <p>
            En tjeneste fra <a href="https://tommyno.no">tommyno.no</a>
          </p>
        </footer>
      </section>
    </>
  );
};

export default IndexPage;
