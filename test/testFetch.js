export const testDataModifyMaterial = (data) => {
  if (data) { // проверка на существование переданного объекта
    if (typeof data.type_id !== 'number' && data.id !== null) { // проверка Ид материала.
      console.error('testDataModifyMaterial', 'Ошибка с id', data.id)
      return false
    }
    if (typeof data.type_id !== 'number' && data.type_id !== null) { // проверка Ид типа материала
      console.error('testDataModifyMaterial', 'Ошибка с type_id', data.type_id)
      return false
    }

    if (typeof data.name !== 'string') { // проверка Полное наименование материала
      console.error('testDataModifyMaterial', 'Ошибка с name', data.name)
      return false
    }
    if (data.abbr !== null && typeof data.abbr !== 'string') { // Сокращённое наименование материала
      console.error('testDataModifyMaterial', 'Ошибка с abbr', data.abbr)
      return false
    }
    if (typeof data.cost !== 'number' && data.cost !== null) { // Цена за единицу материала
      console.error('testDataModifyMaterial', 'Ошибка с cost', data.cost)
      return false
    }
    if (typeof data.id_level3 !== 'number' && data.id_level3 !== null) { // Ид материала Уровня 3
      console.error('testDataModifyMaterial', 'Ошибка с id_level3', data.id_level3)
      return false
    }
    if (typeof data.run_meter_wght_min !== 'number' && data.run_meter_wght_min !== null) { // проверка Мин. масса погонного метра проволоки
      console.error('testDataModifyMaterial', 'Ошибка с run_meter_wght_min', data.run_meter_wght_min)
      return false
    }
    if (typeof data.run_meter_wght_max !== 'number' && data.run_meter_wght_max !== null) { // проверка Макс. масса погонного метра проволоки
      console.error('testDataModifyMaterial', 'Ошибка с run_meter_wght_max', data.run_meter_wght_max)
      return false
    }
    if (typeof data.usage_tag !== 'number' && data.usage_tag !== null) { // проверка Признак использования материала.
      console.error('testDataModifyMaterial', 'Ошибка с usage_tag', data.usage_tag)
      return false
    }
    if (typeof data.hdl_type_id !== 'number' && data.hdl_type_id !== null) { // Ид связанного типа манипуляции
      console.error('testDataModifyMaterial', 'Ошибка с hdl_type_id', data.hdl_type_id)
      return false
    }
    if (typeof data.packaged_output !== 'number' && data.packaged_output !== null) { // проверка Признак пакетированной отдачи.
      console.error('testDataModifyMaterial', 'Ошибка с packaged_output', data.packaged_output)
      return false
    }
    return true
  } else {
    console.error('testDataModifyMaterial', 'Не переданны данные')
    return false
  }
}

export const testDataModifyBatch = (data) => {
  if (data) { // проверка на существование переданного объекта
    if (data.id !== null && typeof data.id !== 'number') { // проверка Ид партии.
      console.error('testDataModifyBatch', 'Ошибка с id', data.id)
      return false
    }
    if (typeof data.type_id !== 'number' && data.type_id !== null) { // проверка Ид партии.
      console.error('testDataModifyBatch', 'Ошибка с type_id', data.type_id)
      return false
    }
    // if (typeof data.name !== 'string') { // Сокращённое наименование материала
    //   console.error('testDataModifyBatch', 'Ошибка с name', data.name)
    //   return false
    // }
    if (typeof data.wght !== 'number' && data.wght !== null) { // Вес партии, кг
      console.error('testDataModifyBatch', 'Ошибка с wght', data.wght)
      return false
    }
    if (typeof data.len !== 'number' && data.len !== null) { // Длина бухты проволоки, м
      console.error('testDataModifyBatch', 'Ошибка с len', data.len)
      return false
    }
    if (typeof data.run_meter_wght !== 'number' && data.run_meter_wght !== null) { // Сокращённое наименование материала
      console.error('testDataModifyBatch', 'Ошибка с run_meter_wght', data.run_meter_wght)
      return false
    }
    if (typeof data.run_meter_wght_fill !== 'number' && data.run_meter_wght_fill !== null) { // Масса погонного метра наполнителя проволоки
      console.error('testDataModifyBatch', 'Ошибка с run_meter_wght_fill', data.run_meter_wght_fill)
      return false
    }
    if (typeof data.fill_factor !== 'number' && data.fill_factor !== null) { // К-т наполнения.
      console.error('testDataModifyBatch', 'Ошибка с fill_factor', data.fill_factor)
      return false
    }
    if (data.comment !== null && typeof data.comment !== 'string') { // Примечание
      console.error('testDataModifyBatch', 'Ошибка с comment', data.comment)
      return false
    }
    return true
  } else {
    console.error('testDataModifyBatch', 'Не переданны данные')
    return false
  }
}
