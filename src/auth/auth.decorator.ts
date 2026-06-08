import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqField = createParamDecorator(
  (fieldName: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!fieldName) {
      return request.user ?? null;
    }
    if (fieldName === 'user') {
      return request.user?.id ?? null;
    }
    return request.body[fieldName] ?? request.query[fieldName] ?? request.params[fieldName];
  },
);