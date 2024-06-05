import { STORAGE_KEY } from '../../../common/js/constants';

export class StorageService {
  constructor(private readonly storageKey: string) {}

  getStorageKey(key: string): string {
    return `${this.storageKey}_${key}`;
  }

  saveData<T>(key: string, data: T): void {
    const storageKey = this.getStorageKey(key);
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  }

  getData<T>(key: string): T | null {
    const storageKey = this.getStorageKey(key);
    const data = sessionStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    const storageKey: string = this.getStorageKey(key);
    sessionStorage.removeItem(storageKey);
  }
}

export const storageService = new StorageService(STORAGE_KEY);
