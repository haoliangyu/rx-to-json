declare module 'rxjs/Observable' {

  interface JSONOptions {
    header?: string;
    footer?: string;
  }

  interface Observable<T> {
    toJSON(path: string, columns: Array<string>, options?: JSONOptions): Observable<T>;
  }
}
