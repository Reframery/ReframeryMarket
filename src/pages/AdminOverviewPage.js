import React, { useEffect } from 'react';
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { numOfUnvalidatedUsers, numOfValidatedUsers } from 'actions/userActions';
import LoadingBox from 'components/LoadingBox';
import MessageBox from 'components/MessageBox';
import { Link } from 'react-router-dom';

export default function OverviewPage() {
    const dispatch = useDispatch();
    //get the admin user information
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userCommunity = userInfo.communityName;

    //states of getting the number of validated users
    const validatedUsersCount = useSelector((state) => state.validatedUsersCount);
    const { loading: loadingOfValidated, error: errorOfValidated, counterOfValidated } = validatedUsersCount;

    //states of getting the number of unvalidated users
    const unvalidatedUsersCount = useSelector((state) => state.unvalidatedUsersCount);
    const { loading: loadingOfUnvalidated, error: errorOfUnvalidated, counterOfUnvalidated } = unvalidatedUsersCount;

    useEffect(() => {
        dispatch(numOfValidatedUsers(userCommunity));
        dispatch(numOfUnvalidatedUsers(userCommunity));
    }, [dispatch, userCommunity]);
    return (
        <div >
            {loadingOfValidated || loadingOfUnvalidated? (
                <LoadingBox></LoadingBox>
            ) : errorOfValidated || errorOfUnvalidated? (
                <MessageBox variant="danger">{errorOfValidated}</MessageBox>
            ) : (
                <div>
                    <Header />
                    <div className="columns sidebar-content">
                        <div className="column is-one-fifth"><SideBar /></div>
                        <div className="column is-four-fifths ">
                            <div className="is-centered ml-6 mr-6 mt-6 background-white is-size-5">
                                <div className="px-6 py-6">
                                    <div className="columns has-text-weight-bold has-text-centered">
                                        <div className="column is-one-third "> All Users</div>
                                        <div className="column is-one-third "> Awaiting Validation</div>
                                        <div className="column is-one-third "> Validated Users</div>
                                    </div>

                                    <div className="columns has-text-centered">
                                        <div className="column is-one-third "> {counterOfValidated + counterOfUnvalidated} </div>
                                        <div className="column is-one-third "> <Link to='/admin/awaiting-validation'>{counterOfUnvalidated} </Link></div>
                                        <div className="column is-one-third ">{counterOfValidated}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>

    );

}
