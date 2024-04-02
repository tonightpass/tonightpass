import {
  Post as NestPost,
  Get as NestGet,
  Delete as NestDelete,
  Patch as NestPatch,
  Put as NestPut,
} from "@nestjs/common";
import { Endpoints, PathsFor } from "tonightpass";

export const Get: <Path extends PathsFor<"GET">>(
  path?: Path,
) => MethodDecorator = NestGet;

export const Post: <
  Path extends Extract<Endpoints, { method: "POST" }>["path"],
>(
  path?: Path,
) => MethodDecorator = NestPost;

export const Put: <Path extends Extract<Endpoints, { method: "PUT" }>["path"]>(
  path?: Path,
) => MethodDecorator = NestPut;

export const Patch: <
  Path extends Extract<Endpoints, { method: "PATCH" }>["path"],
>(
  path?: Path,
) => MethodDecorator = NestPatch;

export const Delete: <
  Path extends Extract<Endpoints, { method: "DELETE" }>["path"],
>(
  path?: Path,
) => MethodDecorator = NestDelete;
