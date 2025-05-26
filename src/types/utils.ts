// Makes a type nullable (value or null)
export type Nullable<T> = T | null;

// Makes a type undefinable (value or undefined)
export type Undefinable<T> = T | undefined;

// Makes a type optional (value, undefined, or not present at all)
export type Optional<T> = T | null | undefined;

// Deeply makes all fields optional
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

// Recursively makes all fields readonly
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
