import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AccessAuth => {
    const req = ctx.switchToHttp().getRequest<{ auth: AccessAuth}>();
    return req.auth;
  },
);