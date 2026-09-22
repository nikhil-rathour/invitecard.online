import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="mb-3 font-display text-4xl font-bold text-text">{title}</h1>
      <p className="mb-8 text-muted">{description}</p>
      <Link to="/templates">
        <Button>Explore Invitations</Button>
      </Link>
    </div>
  )
}
