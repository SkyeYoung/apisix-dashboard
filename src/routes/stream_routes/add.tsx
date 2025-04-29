import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stream_routes/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/stream_routes/add"!</div>
}
