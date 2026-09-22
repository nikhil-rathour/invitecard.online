import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/home/HomePage'
import TemplatesPage from '../pages/templates/TemplatesPage'
import TemplateDetailPage from '../pages/templates/TemplateDetailPage'
import CreateInvitationPage from '../pages/invitation/CreateInvitationPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import PublicInvitationPage from '../pages/invitation/PublicInvitationPage'
import PlaceholderPage from '../pages/PlaceholderPage'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="mb-2 font-display text-4xl font-bold text-text">Page not found</h1>
      <p className="text-muted">The page you are looking for does not exist.</p>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone immersive public invitation routes */}
      <Route path="/i/:slug" element={<PublicInvitationPage />} />
      <Route path="/demo/:slug" element={<PublicInvitationPage />} />

      {/* Main website layout routes */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/templates/:slug" element={<TemplateDetailPage />} />
              <Route path="/create-invitation/:templateId" element={<CreateInvitationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/login"
                element={
                  <PlaceholderPage
                    title="Login is coming next"
                    description="JWT authentication will be added in the next development phase. You can still create and save drafts as a development user."
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <PlaceholderPage
                    title="About InviteCard"
                    description="A premium Indian digital invitation studio. Full company pages will follow with CMS content."
                  />
                }
              />
              <Route
                path="/privacy"
                element={
                  <PlaceholderPage
                    title="Privacy Policy"
                    description="A complete privacy policy will be published before public launch."
                  />
                }
              />
              <Route
                path="/terms"
                element={
                  <PlaceholderPage
                    title="Terms of Service"
                    description="Terms will be published before paid checkout is enabled."
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}
