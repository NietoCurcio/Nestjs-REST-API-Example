import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role.enum';

// guards executes after middleware and before pipes and interceptors
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // the default role in Controller context, will be the default
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) throw new UnauthorizedException();
    return roles.some((role) => user.roles?.includes(role));
    // return matchRoles(roles, 'user.roles');
  }
}

function matchRoles(rolesRoute, rolesUser) {
  // here is logic parsing rolesRoute and rolesUser
  if (rolesRoute[0] == 'user') return true;
  return false;
}
