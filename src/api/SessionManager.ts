import { ELocalStorageKey } from "@/constants/localStorage.ts";
export class SessionManager {
  private getItem(key: ELocalStorageKey): string {
    const value =  localStorage.getItem(key);
    return (value as string) || '';
  }

  private setItem(key: ELocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  private removeItem(key: ELocalStorageKey) {
    localStorage.removeItem(key);
  }

  public get token(): string {
    return this.getItem(ELocalStorageKey.USER_TOKEN);
  }

  public setToken(token: string) {
    this.setItem(ELocalStorageKey.USER_TOKEN, token);
  }

  public removeTokens() {
    this.removeItem(ELocalStorageKey.USER_TOKEN);
  }
}

export default new SessionManager();
