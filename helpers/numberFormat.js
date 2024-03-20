export default function numberFormat (value) {
  return new Intl.NumberFormat().format(Number(value))
}
