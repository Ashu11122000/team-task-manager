declare module "swagger-ui-react" {
  import { FC } from "react";

  export interface SwaggerUIProps {
    spec?: object;
    url?: string;
  }

  const SwaggerUI: FC<SwaggerUIProps>;

  export default SwaggerUI;
}