import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// guards executes after middleware and before pipes and interceptors
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // the default role in Controller context, will be the default
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return matchRoles(roles, 'user.roles');
  }
}

function matchRoles(rolesRoute, rolesUser) {
  // here is logic parsing rolesRoute and rolesUser
  if (rolesRoute[0] == 'user') return true;
  return false;
}
