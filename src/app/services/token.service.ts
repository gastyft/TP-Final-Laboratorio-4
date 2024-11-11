import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_ENTIDAD_KEY = 'AuthIdEntidad';  // Nueva constante para idEntidad

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }
  
  public getToken(): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
  }
  
  public setUserName(userName: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(USERNAME_KEY);
      window.sessionStorage.setItem(USERNAME_KEY, userName);
    }
  }
  
  public getUserName(): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(USERNAME_KEY);
    }
    return null;
  }
  
  public setAuthorities(authorities: string[]): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(AUTHORITIES_KEY);
      window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }
  }
  
  public getAuthorities(): string[] {
    this.roles = [];
    if (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }
  
  public setIdEntidad(idEntidad: number): void {
    if (idEntidad != null && typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(ID_ENTIDAD_KEY, idEntidad.toString());
    }
  }
  
  public getIdEntidad(): number | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const idEntidad = sessionStorage.getItem(ID_ENTIDAD_KEY);
      return idEntidad ? parseInt(idEntidad) : null;
    }
    return null;
  }
  
  public logOut(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear();
    }
  }
}  
