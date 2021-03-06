export enum DescriptiveStatistic {
  AVERAGE,
  COUNT,
  MAXIMUM,
  MEDIAN,
  MINIMUM,
  SUM,
  INTERQUARTILE_RANGE,
  LOWER_QUARTILE,
  UPPER_QUARTILE,
  QUARTILES,
  RECEIVED_MESSAGES,
  DISTINCT
}

export function getStatEnumValue(key) {
  return DescriptiveStatistic[key]
}
