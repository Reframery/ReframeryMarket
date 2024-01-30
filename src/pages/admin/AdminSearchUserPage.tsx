import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "components/ui/Input"
import { Label } from "components/ui/Label"
import { Button } from "components/ui/Button"

export default function AdminSearchUserPage() {
  const navigate = useNavigate()
  const [searchUserEmail, setSearchUserEmail] = useState("")

  return (
    <div className="p-6 is-size-5">
      <Label className="text-lg font-semibold">Search User By Email</Label>
      <div className="flex max-w-xl">
        <Input
          type="email"
          className="rounded-r-none"
          value={searchUserEmail}
          onChange={(e) => setSearchUserEmail(e.target.value)}
        />
        <Button
          className="rounded-l-none"
          onClick={() => {
            searchUserEmail &&
              navigate(`/admin/search?email=${searchUserEmail}`)
          }}
        >
          Search
        </Button>
      </div>
    </div>
  )
}
