import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_ENTIDAD_KEY = 'AuthIdEntidad';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  public setToken(token: string): void {
    if (this.isBrowser()) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    return this.isBrowser() ? window.sessionStorage.getItem(TOKEN_KEY) : null;
  }

  public setUserName(userName: string): void {
    if (this.isBrowser()) {
      window.sessionStorage.removeItem(USERNAME_KEY);
      window.sessionStorage.setItem(USERNAME_KEY, userName);
    }
  }

  public getUserName(): string | null {
    return this.isBrowser() ? window.sessionStorage.getItem(USERNAME_KEY) : null;
  }

  public setAuthorities(authorities: string[]): void {
    if (this.isBrowser()) {
      window.sessionStorage.removeItem(AUTHORITIES_KEY);
      window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (this.isBrowser() && sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public setIdEntidad(idEntidad: number): void {
    if (this.isBrowser() && idEntidad != null) {
      sessionStorage.setItem(ID_ENTIDAD_KEY, idEntidad.toString());
    }
  }

  public getIdEntidad(): number | null {
    if (this.isBrowser()) {
      const idEntidad = sessionStorage.getItem(ID_ENTIDAD_KEY);
      return idEntidad ? parseInt(idEntidad) : null;
    }
    return null;
  }

  public logOut(): void {
    if (this.isBrowser()) {
      window.sessionStorage.clear();
    }
  }
}
