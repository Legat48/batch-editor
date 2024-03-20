// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validFormModal (dialogObg, choiseMatType, data) {
  // eslint-disable-next-line prefer-const
  let ans = true
  // if (!!dialogObg.obgUnit.inputFillingFactor && choiseMatType === 2 && !/^[0-9.,]+$/.test(data.fill_factor)) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputWeightMeterMax && choiseMatType === 2 && !/^[0-9.,]+$/.test(data.run_meter_wght_max)) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputWeightMeterMin && choiseMatType === 2 && !/^[0-9.,]+$/.test(data.run_meter_wght_min)) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputWeightMeterFiller && choiseMatType === 2 && !/^[0-9.,]+$/.test(data.run_meter_wght_fill)) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputWeightMeterWire && choiseMatType === 2 && !/^[0-9.,]+$/.test(data.run_meter_wght)) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputPathWeight && choiseMatType !== 3 && !/^[0-9.,]+$/.test(data.wght)) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputBatchLength && choiseMatType === 2 && !/^[0-9.,]+$/.test(data.len)) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputMaterialFullName && !data.name) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputMaterialName && !data.abbr && data.abbr?.length < 3) {
  //   ans = false
  // }
  // if (!!dialogObg.obgUnit.inputPathNumber && !data.batch_no && data.batch_no?.length < 1) {
  //   ans = false
  // }
  return ans
}
