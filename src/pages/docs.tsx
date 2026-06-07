import dynamic from "next/dynamic";
import Head from "next/head";

const SwaggerUI = dynamic(
  () => import("swagger-ui-react"),
  {
    ssr: false,
  }
);

export default function DocsPage() {
  return (
    <>
      <Head>
        <title>API Documentation</title>
      </Head>

      <SwaggerUI url="/api/swagger" />
    </>
  );
}