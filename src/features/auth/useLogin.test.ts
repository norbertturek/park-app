import { describe, test, expect, vi, beforeEach } from 'vitest'

// Mock token storage to avoid touching real localStorage
vi.mock('./tokenStorage', () => ({
  setToken: vi.fn(),
}))

import { useLogin, type LoginSuccess } from './useLogin'
import { setToken } from './tokenStorage'

function createDeferred<T>() {
  let resolve!: (v: T | PromiseLike<T>) => void
  let reject!: (e?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('useLogin', () => {
  test('initial state: loading=false, error=null', () => {
    const { loading, error } = useLogin()
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  test('sets loading true during request and false afterwards (success)', async () => {
    const deferred = createDeferred<Response>()

    vi.stubGlobal('fetch', vi.fn(() => deferred.promise as unknown as Response))

    const { login, loading } = useLogin()
    const loginPromise = login({ email: 'a@b.com', password: 'pw' })

    // At this point, before resolving fetch, loading should be true in next microtask
    await Promise.resolve()
    expect(loading.value).toBe(true)

    // Resolve the fetch with a proper Response-like object
    deferred.resolve({
      ok: true,
      json: async () => ({ data: { login: { token: 'abc' } } }),
    } as unknown as Response)
    const result = (await loginPromise) as LoginSuccess

    expect(result.token).toBe('abc')
    expect(loading.value).toBe(false)
  })

  test('success: stores token via setToken and returns token', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({ data: { login: { token: 'jwt-token' } } }),
    }) as unknown as Response))

    const { login, error } = useLogin()
    const result = await login({ email: 'user@test.com', password: 'secret' })

    expect(result).toEqual({ token: 'jwt-token' })
    expect(setToken).toHaveBeenCalledWith('jwt-token')
    expect(error.value).toBe(null)
  })

  test('network error (res.ok=false) sets user-friendly error and returns null', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, json: async () => ({}) }) as unknown as Response))

    const { login, error, loading } = useLogin()
    const result = await login({ email: 'x@y.z', password: 'pw' })

    expect(result).toBeNull()
    expect(error.value).toBe('Network error. Please try again.')
    expect(loading.value).toBe(false)
  })

  test('GraphQL error surfaces first error message', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({ errors: [{ message: 'Invalid credentials' }] }),
    }) as unknown as Response))

    const { login, error } = useLogin()
    const result = await login({ email: 'u@t.com', password: 'bad' })

    expect(result).toBeNull()
    expect(error.value).toBe('Invalid credentials')
  })

  test('missing token in response -> Unexpected response format', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({ data: { login: {} } }),
    }) as unknown as Response))

    const { login, error } = useLogin()
    const result = await login({ email: 'u@t.com', password: 'pw' })

    expect(result).toBeNull()
    expect(error.value).toBe('Unexpected response format')
  })

  test('fetch throws -> sets error message from thrown Error and returns null', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('boom') }))

    const { login, error } = useLogin()
    const result = await login({ email: 'u@t.com', password: 'pw' })

    expect(result).toBeNull()
    expect(error.value).toBe('boom')
  })
})
