export default function duplicationRemoverFunction<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
