import React, { useEffect } from 'react';
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from 'components/LoadingBox';
import MessageBox from 'components/MessageBox';
import { Link } from 'react-router-dom';

export default function OverviewPage() {
    const dispatch = useDispatch();
    //get the admin user information
    const userSignin = useSelector(state => state.userSignin);

    //states of getting the number of validated users
    const validatedUsersCount = 0;

    //states of getting the number of unvalidated users
    const unvalidatedUsersCount =  0;

    useEffect(() => {
        //dispatch(numOfValidatedUsers(userCommunity));
        //dispatch(numOfUnvalidatedUsers(userCommunity));
    }, [dispatch]);
    return (
        <div >
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
                                        <div className="column is-one-third "> {0 + 0   } </div>
                                        <div className="column is-one-third "> <Link to='/admin/awaiting-validation'>{0} </Link></div>
                                        <div className="column is-one-third ">{0}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
        </div>

    );

}
