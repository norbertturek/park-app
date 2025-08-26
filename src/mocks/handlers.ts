import { graphql, HttpResponse } from 'msw'

// GraphQL handlers for mocked API
export const handlers = [
  // Mocked Login mutation
  graphql.mutation('Login', async ({ variables }) => {
    const { email, password } = (variables || {}) as { email?: string; password?: string }

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 400))

    // Success scenario (use provided tester credentials)
    if (email === 'tester@parkapp.pl' && password === '123$TesT$321') {
      return HttpResponse.json({
        data: {
          login: { token: 'mock-token-123' },
        },
      })
    }

    // Invalid credentials -> GraphQL error shape
    return HttpResponse.json(
      {
        errors: [
          {
            message: 'Invalid email or password',
            path: ['login'],
            extensions: { code: 'UNAUTHENTICATED' },
          },
        ],
        data: null,
      },
      { status: 200 }
    )
  }),
]
