export function getItem(key: string) {
  const value = localStorage.getItem(key)

  if (value === 'null') {
    return null
  }

  return value
}

export function hasItem(key: string) {
  const value = getItem(key)

  return value !== null
}

export function setItem(key: string, value: any) {
  localStorage.setItem(key, value)

  return value
}

export async function clear() {
  localStorage.clear()
}

export default {
  get: getItem,
  set: setItem,
  has: hasItem,
  clear,
}
