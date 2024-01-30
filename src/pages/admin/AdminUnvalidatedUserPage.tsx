import {
  useNonMarketUsersQuery,
  useValidateUserMutation,
} from "app/services/admin"
import { handleRTKError } from "lib/utils"
import { toast } from "react-toastify"
import LoadingBox from "../../components/ui/LoadingBox"
import MessageBox from "../../components/ui/MessageBox"

export default function AdminUnvalidatedUserPage() {
  // the number of tokens for a new user
  // const initalTokens = 25

  const { data: users, isFetching, error, refetch } = useNonMarketUsersQuery()

  const [validate, { error: validationError, isLoading: validationLoading }] =
    useValidateUserMutation()

  const validationHandler = async (id: number, communityName: string) => {
    try {
      const message = await validate({ id, communityName }).unwrap()
      toast(message)
      refetch()
    } catch (err) {
      validationError && toast(handleRTKError(validationError))
    }
  }

  return (
    <div className="px-6 py-6">
      {isFetching ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{handleRTKError(error)}</MessageBox>
      ) : (
        <div>
          <div className="columns has-text-weight-bold has-text-centered">
            <div className="column is-one-third"> Email</div>
            <div className="column"> &nbsp;</div>
          </div>
          {!users || users.length === 0 ? (
            <p>No Users found</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="columns has-text-centered">
                <div className="column is-one-third">{user.email}</div>
                <div className="add-dropdown">
                  <div className="column">
                    <button className="button is-primary is-rounded">
                      {validationLoading ? "Adding..." : "Add"}
                    </button>
                  </div>
                  <ul className="add-dropdown-content">
                    <button
                      onClick={() => {
                        validationHandler(user.id, "canada")
                      }}
                    >
                      Canada
                    </button>
                    <button
                      onClick={() => {
                        validationHandler(user.id, "usa")
                      }}
                    >
                      USA
                    </button>
                    <button
                      onClick={() => {
                        validationHandler(user.id, "brazil")
                      }}
                    >
                      Brazil
                    </button>
                    <button
                      onClick={() => {
                        validationHandler(user.id, "mexico")
                      }}
                    >
                      Mexico
                    </button>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
