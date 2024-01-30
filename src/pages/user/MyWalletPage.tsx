import { useTransactionsQuery } from "app/services/transaction"
import SideBar from "components/SideBar"
import LoadingBox from "components/ui/LoadingBox"
import MessageBox from "components/ui/MessageBox"
import { useAuth } from "hooks/useAuth"
import { handleRTKError } from "lib/utils"

export default function WalletPage() {
  const { user } = useAuth()
  return (
    <div className="sidebar-content">
      <SideBar />
      <div className="wallet-container">
        <div className="wallet">
          <div className="wallet-c1">
            <div>
              <div className="content content-margined">
                <div className="order-header">
                  <h3>Your current balance</h3>
                </div>
                <div className="currency-box">
                  <h1>${user?.marketProfile.currentCredit}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="wallet-c2">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  )
}

function TransactionHistory() {
  const {
    data: transactions,
    isFetching: loading,
    error,
  } = useTransactionsQuery()
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{handleRTKError(error)}</MessageBox>
      ) : !transactions ? (
        <p>No transactions found</p>
      ) : (
        <div className="content content-margined">
          <div className="order-header">
            <h3>Transaction History</h3>
          </div>
          <div className="order-list">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FROM</th>
                  <th>TO</th>
                  <th>DATE</th>
                  <th>CREDIT UNIT</th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0
                  ? transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.sender.email}</td>
                        <td>{transaction.receiver.email}</td>
                        <td>
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </td>
                        <td>${transaction.creditUnit}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>

    //   {<div className="transaction">
    //      {transactions.map((transaction) => (<div key={transaction.id}>
    //               <div className="trans-text">
    //                   <div>
    //                       <div>Transaction ID: {transaction.id}</div>
    //                       <div>From: {transaction.senderEmail}</div>
    //                       <div>To: {transaction.receiverEmail}</div>
    //                       <div>Date: {transaction.createdTime}</div>
    //                       <div>Credit Unit: ${transaction.creditUnit}</div>
    //                   </div>
    //               </div>
    //       </div>))}
    //   </div>
    //      </div>)}</div> }
  )
}
