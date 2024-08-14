import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

export default function ProjectsNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Project not found"
        description="The project you are looking for does not exist"
        retryLink="/projects"
        retryLinkText="Go to projects"
      />
    </Shell>
  )
}