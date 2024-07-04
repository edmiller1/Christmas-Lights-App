import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: () => <div>Hello /app!</div>
})