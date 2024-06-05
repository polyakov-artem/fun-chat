import { SingleValueVoidFn } from '../../../types/types';

export class Observable<T> {
  #observers: Array<SingleValueVoidFn<T>> = [];

  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  setValue(value: T): void {
    if (this.#value === value) return;
    this.#value = value;
    this.notifyAll(value);
  }

  getValue(): T {
    return this.#value;
  }

  subscribe(observer: SingleValueVoidFn<T>): void {
    this.#observers.push(observer);
  }

  unsubscribe(observer: SingleValueVoidFn<T>): void {
    const index = this.#observers.indexOf(observer);

    if (index !== -1) {
      this.#observers.splice(index, 1);
    }
  }

  notifyAll(value: T): void {
    this.#observers.forEach((observer) => observer(value));
  }

  unsubscribeAll(): void {
    this.#observers.length = 0;
  }
}
