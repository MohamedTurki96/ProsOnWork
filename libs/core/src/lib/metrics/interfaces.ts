import type {
  DefaultMetricsCollectorConfiguration,
  PrometheusContentType,
} from "prom-client"

export interface PrometheusDefaultMetrics {
  enabled: boolean
  /**
   * {@link https://github.com/siimon/prom-client#default-metrics | Default Metrics}
   */
  config?: DefaultMetricsCollectorConfiguration<PrometheusContentType>
}

export interface PrometheusOptions {
  defaultMetrics?: PrometheusDefaultMetrics
  defaultLabels?: Record<string, any>
}
