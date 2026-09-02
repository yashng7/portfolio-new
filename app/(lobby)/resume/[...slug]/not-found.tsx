import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

export default function ResumeNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Resume not found"
        description="The resume you are looking for does not exist"
        retryLink="/resume"
        retryLinkText="Go to resume"
      />
    </Shell>
  )
}
