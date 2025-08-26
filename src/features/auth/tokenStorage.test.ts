import { expect, test } from 'vitest'
import { getToken, setToken, clearToken } from './tokenStorage'

import { beforeAll, beforeEach, vi } from 'vitest'

// Provide a simple localStorage polyfill if the environment doesn't have one
beforeAll(() => {
  type StorageLike = {
    getItem(key: string): string | null
    setItem(key: string, value: string): void
    removeItem(key: string): void
    clear(): void
  }
  const globalScope = globalThis as unknown as { localStorage?: StorageLike }
  if (!globalScope.localStorage) {
    let store: Record<string, string> = {}
    globalScope.localStorage = {
      getItem: (key: string) => (key in store ? store[key] : null),
      setItem: (key: string, value: string) => {
        store[key] = String(value)
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    }
  }
})

beforeEach(() => {
  // reset storage and mocks between tests
  localStorage.clear()
  vi.restoreAllMocks()
})

test('getToken returns null when no token is set', () => {
  expect(getToken()).toBe(null)
})

test('setToken stores the token under auth_token key', () => {
  const spy = vi.spyOn(localStorage, 'setItem')
  setToken('test')
  expect(spy).toHaveBeenCalledWith('auth_token', 'test')
})

test('getToken returns the token when it is set', () => {
  setToken('test')
  expect(getToken()).toBe('test')
})

test('clearToken removes the token', () => {
  setToken('test')
  clearToken()
  expect(getToken()).toBe(null)
})

test('getToken returns null when localStorage.getItem throws', () => {
  vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
    throw new Error('storage error')
  })
  expect(getToken()).toBe(null)
})

test('setToken does not throw when localStorage.setItem throws', () => {
  vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
    throw new Error('quota exceeded')
  })
  expect(() => setToken('test')).not.toThrow()
})

test('clearToken does not throw when localStorage.removeItem throws', () => {
  vi.spyOn(localStorage, 'removeItem').mockImplementation(() => {
    throw new Error('storage error')
  })
  expect(() => clearToken()).not.toThrow()
})