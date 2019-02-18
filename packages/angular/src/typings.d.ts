/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

type PickFlat<T, U extends keyof T> = Pick<T, U>[U];
