/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

type PickFlat<T, U extends keyof T> = Pick<T, U>[U];
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type Visible<T> = T & { isVisible?: true };
