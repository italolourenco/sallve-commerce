export interface ICacheManager {
  get(key: string): Promise<string>;
  set(key: string, value: string): void;
  delete(key: string): void;
}
