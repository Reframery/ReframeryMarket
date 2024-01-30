import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useSearchUserQuery } from "app/services/admin"
import { handleRTKError } from "lib/utils"

import LoadingBox from "components/ui/LoadingBox"
import MessageBox from "components/ui/MessageBox"

export default function AdminSearchUserResultPage() {
  const [searchParams] = useSearchParams()
  const userEmail = searchParams.get("email")
  const [creditUnit, setCreditUnit] = useState(0)

  const {
    isFetching: loading,
    error,
    data: user,
  } = useSearchUserQuery(userEmail ?? "unknown")

  return (
    <div className="p-6 is-size-5">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{handleRTKError(error)}</MessageBox>
      ) : !user ? (
        <p>No UserFound</p>
      ) : (
        <>
          <div className="is-size-5 has-text-weight-bold">User Details</div>
          <div className="columns">
            <div className="column is-one-third">Email</div>
            <div className="column">{user.email}</div>
          </div>
          <div className="columns">
            <div className="column is-one-third">Currency Balance</div>
            <div className="column">{user.currentCredit}</div>
          </div>
          <div className="is-size-5 has-text-weight-bold">
            {" "}
            Update user's Balance
          </div>
          <div className="columns">
            <div className="column is-one-third">Unit of Currency</div>
            <div className="columns">
              <div className="column is-one-quarter">
                <input
                  type="number"
                  value={creditUnit}
                  onChange={(e) => setCreditUnit(e.target.valueAsNumber)}
                />
              </div>
              <div className="column is-one-quarter">
                <button
                  className="button is-primary is-rounded"
                  onClick={(e) => {
                    e.preventDefault()
                    if (creditUnit > 0 && creditUnit < 1000) {
                      const confirm = window.confirm(
                        "Do you wish to send " +
                          creditUnit +
                          " tokens to " +
                          user.email +
                          "?"
                      )
                      if (confirm) {
                        //todo
                      }
                    } else {
                      alert(
                        "The number should be greater than 0 and less than 1000!"
                      )
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
