import { Link, useNavigate } from 'react-router-dom'
import { Eye, Plus } from '@phosphor-icons/react'
import Button from '../ui/Button'
import TemplatePreview from './TemplatePreview'

export default function TemplateCard({ template }) {
  const navigate = useNavigate()
  const { name, slug, category } = template

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 hover:shadow-xl hover:ring-primary/30">
      <Link to={`/templates/${slug}`} className="relative block aspect-[3/4] w-full overflow-hidden">
        <TemplatePreview
          template={template}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

        {/* Metadata */}
        <div className="absolute bottom-0 left-0 w-full p-5 transition-transform duration-300 group-hover:-translate-y-12">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gold-light">
            {category}
          </p>
          <h3 className="font-display text-2xl font-bold text-white">
            {name}
          </h3>
        </div>

        {/* Action Buttons Bar */}
        <div className="absolute bottom-0 left-0 flex w-full translate-y-full gap-2 p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 border-transparent bg-white/95 text-text backdrop-blur-md hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/templates/${slug}`)
            }}
          >
            <Eye size={16} className="mr-1" />
            View Detail
          </Button>
          <Button
            size="sm"
            className="flex-1 shadow-md"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/create-invitation/${slug}`)
            }}
          >
            <Plus size={16} className="mr-1" />
            Use Template
          </Button>
        </div>
      </Link>
    </div>
  )
}
