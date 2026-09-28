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
      {/* Live Customized Personalized Invitations (Both short URL and full path) */}
      <Route path="/invitations/jaipur-shahi-vivah/:slug" element={<Template2 />} />
      <Route path="/invitations/live/jaipur-shahi-vivah/:id" element={<Template2 />} />

      {/* Standalone Invitation Demos — no Header/Footer, wrapped in DemoWrapper */}
      <Route path="/invitations/demo/jaipur-shahi-vivah" element={<DemoWrapper><Template2 /></DemoWrapper>} />
      <Route path="/invitations/demo/jaipur-shahi-vivah/:id" element={<DemoWrapper><Template2 /></DemoWrapper>} />
      <Route path="/invitations/demo/royal-garden-wedding" element={<DemoWrapper><Template1 /></DemoWrapper>} />
      <Route path="/invitations/demo/udaipur-lake-palace" element={<DemoWrapper><Template3 /></DemoWrapper>} />
      <Route path="/invitations/demo/mughal-opulence" element={<DemoWrapper><Template4 /></DemoWrapper>} />
      <Route path="/invitations/demo/floral-mandap" element={<DemoWrapper><Template5 /></DemoWrapper>} />
      <Route path="/invitations/demo/pink-city-celebration" element={<DemoWrapper><Template6 /></DemoWrapper>} />

      {/* Main Website Fixed Pages (Wrapped in Layout) */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/invitations" element={<Layout><TemplatePage /></Layout>} />
      <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
      <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
      <Route
        path="/about"
        element={
          <Layout>
            <PlaceholderPage
              title="About InviteCard"
              description="A premium Indian digital invitation studio."
            />
          </Layout>
        }
      />
      <Route
        path="/privacy"
        element={
          <Layout>
            <PlaceholderPage
              title="Privacy Policy"
              description="A complete privacy policy will be published before public launch."
            />
          </Layout>
        }
      />
      <Route
        path="/terms"
        element={
          <Layout>
            <PlaceholderPage
              title="Terms of Service"
              description="Terms will be published before paid checkout is enabled."
            />
          </Layout>
        }
      />

      {/* Short URL Route for personalized invitations: e.g. /ananya-weds-rohan-mliifx */}
      <Route path="/:slug" element={<Template2 />} />

      {/* Fallback 404 */}
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  )
}
