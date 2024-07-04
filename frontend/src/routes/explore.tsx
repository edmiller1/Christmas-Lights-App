import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explore')({
  component: () => <div>Hello /explore!</div>
})