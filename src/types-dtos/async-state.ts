export type AsyncState<T extends object> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | ({ status: 'success' } & T);
