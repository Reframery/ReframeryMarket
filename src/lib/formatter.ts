const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
export function formatCurrency(value: number) {
  return CURRENCY_FORMATTER.format(value)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')
export function formatNumber(value: number) {
  return NUMBER_FORMATTER.format(value)
}