type TransformDates<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Array<infer U>
      ? TransformDates<U>[]
      : T[K] extends object
        ? TransformDates<T[K]>
        : T[K];
};

function transformDates<T>(obj: T): TransformDates<T> {
  if (Array.isArray(obj)) {
    return obj.map(transformDates) as TransformDates<T>;
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        value instanceof Date ? value.toISOString() : transformDates(value),
      ]),
    ) as TransformDates<T>;
  }
  return obj as TransformDates<T>;
}

export default transformDates;
