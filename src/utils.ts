export class Debounce {
  callback;
  delay;
  timeOut: NodeJS.Timeout = setTimeout(() => {}, 0);
  constructor(callback: Function, delay: number = 500) {
    this.callback = callback;
    this.delay = delay;
  }
  call(...args: any[]) {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => this.callback(...args), this.delay);
  }
}
