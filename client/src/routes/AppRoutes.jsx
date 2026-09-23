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
      {/* Standalone Template Demos (Zero website chrome / no Header or Footer) */}
      <Route path="/templates/template1" element={<Template1 />} />
      <Route path="/templates/template2" element={<Template2 />} />
      <Route path="/templates/template3" element={<Template3 />} />
      <Route path="/templates/template4" element={<Template4 />} />
      <Route path="/templates/template5" element={<Template5 />} />
      <Route path="/templates/template6" element={<Template6 />} />

      {/* Main Website Pages (Wrapped in Layout) */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/templates" element={<TemplatePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/login"
                element={
                  <PlaceholderPage
                    title="Login is coming next"
                    description="JWT authentication will be added in the next development phase."
                  />
                }
              />
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
