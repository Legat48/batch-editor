export function createdDate (date) {
  const currDate = new Date(date)
  let day = currDate.getDate()
  let month = currDate.getMonth() + 1
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  const year = currDate.getFullYear()
  return day + '.' + month + '.' + year
}
