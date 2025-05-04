export function getMetricsToken(name: string): string {
  return `PROM_METRIC_${name.toUpperCase()}`
}
