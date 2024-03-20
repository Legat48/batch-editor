export function checkSomeActive (arr) {
  let ans = false
  for (const item of arr) {
    if (item.active) {
      ans = true
    }
  }
  return ans
}
