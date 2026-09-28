import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/home/HomePage'
import AdminPage from '../pages/admin/AdminPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import PlaceholderPage from '../pages/PlaceholderPage'
import TemplatePage from '../pages/templatesPage/TemplatePage'
import Template1 from '../pages/templatesPage/Template1'
import Template2 from '../pages/templatesPage/Template2'
import Template3 from '../pages/templatesPage/Template3'
import Template4 from '../pages/templatesPage/Template4'
import Template5 from '../pages/templatesPage/Template5'
import Template6 from '../pages/templatesPage/Template6'
import DemoWrapper from '../components/layout/DemoWrapper'

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
      {/* Standalone Invitation Demos — no Header/Footer, wrapped in DemoWrapper */}
      <Route path="/invitations/demo/jaipur-shahi-vivah" element={<DemoWrapper><Template2 /></DemoWrapper>} />
      <Route path="/invitations/demo/royal-garden-wedding" element={<DemoWrapper><Template1 /></DemoWrapper>} />
      <Route path="/invitations/demo/udaipur-lake-palace" element={<DemoWrapper><Template3 /></DemoWrapper>} />
      <Route path="/invitations/demo/mughal-opulence" element={<DemoWrapper><Template4 /></DemoWrapper>} />
      <Route path="/invitations/demo/floral-mandap" element={<DemoWrapper><Template5 /></DemoWrapper>} />
      <Route path="/invitations/demo/pink-city-celebration" element={<DemoWrapper><Template6 /></DemoWrapper>} />

      {/* Main Website Pages (Wrapped in Layout) */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/invitations" element={<TemplatePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/about"
                element={
                  <PlaceholderPage
                    title="About InviteCard"
                    description="A premium Indian digital invitation studio."
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
