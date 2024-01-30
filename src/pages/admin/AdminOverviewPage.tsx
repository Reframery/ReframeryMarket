import { Link } from "react-router-dom"
// import LoadingBox from "components/LoadingBox"
// import MessageBox from "components/MessageBox"

export default function AdminOverviewPage() {
  //get the admin user information
  // const userSignin = useSelector((state) => state.userSignin)

  //states of getting the number of validated users
  // const validatedUsersCount = 0

  //states of getting the number of unvalidated users
  // const unvalidatedUsersCount = 0

  // useEffect(() => {
  //dispatch(numOfValidatedUsers(userCommunity));
  //dispatch(numOfUnvalidatedUsers(userCommunity));
  // }, [dispatch])
  return (
    <div className="p-6 flex justify-evenly font-bold text-center flex-wrap gap-4">
      <div>
        <div>All Users</div>
        <div> {0 + 0} </div>
      </div>
      <div>
        <div>Awaiting Validation</div>
        <div className="">
          <Link to="/admin/awaiting-validation">{0} </Link>
        </div>
      </div>
      <div>
        <div>Validated Users</div>
        <div>{0}</div>
      </div>
    </div>
  )
}
