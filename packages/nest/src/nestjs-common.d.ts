import * as tonightpass from "tonightpass";

declare module "@nestjs/common" {
  export const Get: <Path extends tonightpass.PathsFor<"GET">>(
    path: Path,
  ) => MethodDecorator;

  export const Post: <
    Path extends Extract<tonightpass.Endpoints, { method: "POST" }>["path"],
  >(
    path: Path,
  ) => MethodDecorator;

  export const Put: <
    Path extends Extract<tonightpass.Endpoints, { method: "PUT" }>["path"],
  >(
    path: Path,
  ) => MethodDecorator;

  export const Patch: <
    Path extends Extract<tonightpass.Endpoints, { method: "PATCH" }>["path"],
  >(
    path: Path,
  ) => MethodDecorator;

  export const Delete: <
    Path extends Extract<tonightpass.Endpoints, { method: "DELETE" }>["path"],
  >(
    path: Path,
  ) => MethodDecorator;
}
