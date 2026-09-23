import { Link } from 'react-router-dom'

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'FAQ', to: '/#faq' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="font-display text-xl font-bold text-primary">
                InviteCard
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Beautiful digital invitations for every Indian celebration.
              Personalise every detail and share instantly with your guests.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} InviteCard.online. Made for Indian
          celebrations.
        </div>
      </div>
    </footer>
  )
}
