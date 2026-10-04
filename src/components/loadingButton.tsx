import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function LoadingButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-end" />
        Codie is thinking...
      </Button>
    </div>
  )
}
