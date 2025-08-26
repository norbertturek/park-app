import { ref } from 'vue'
import { setToken } from './tokenStorage'

export type LoginVariables = {
  email: string
  password: string
}

export type LoginSuccess = {
  token: string
}

export function useLogin() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login({ email, password }: LoginVariables): Promise<LoginSuccess | null> {
    error.value = null
    loading.value = true
    try {
      const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operationName: 'Login',
          query:
            'mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { token } }',
          variables: { email, password },
        }),
      })

      if (!res.ok) {
        throw new Error('Network error. Please try again.')
      }

      const json = await res.json()

      if (json.errors?.length) {
        // Show first GraphQL error message
        throw new Error(json.errors[0]?.message || 'Invalid credentials')
      }

      const token: string | undefined = json?.data?.login?.token
      if (!token) {
        throw new Error('Unexpected response format')
      }

      setToken(token)
      return { token }
    } catch (e: any) {
      error.value = e?.message || 'Something went wrong'
      return null
    } finally {
      loading.value = false
    }
  }

  return { login, loading, error }
}
