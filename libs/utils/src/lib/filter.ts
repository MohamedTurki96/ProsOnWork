export function filterUndefined<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== undefined && value !== null
}
