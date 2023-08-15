import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { promoteToManager, searchAdminUsers } from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdminManagePage() {
    const dispatch = useDispatch();
    //signin user states
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userCommunity = userInfo.communityName;

    //search admin users states
    const adminUsers = useSelector((state) => state.adminUsers);
    const { loadingAdmin, error, admins } = adminUsers;

    // update user states
    const userUpdate = useSelector((state) => state.userUpdate);
    const { user: updatedUser } = userUpdate;

    //creating a new adimin user states
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo: newCreatedAdmin } = userRegister;

    //button handler for promote a dmin to a manager
    const promoteHandler = (e) => {
        e.preventDefault();
        const promotedAdminEmail = e.target.value;
        console.log(promotedAdminEmail);
        const confirm = window.confirm("Do you wish to promote " + promotedAdminEmail + " as a manager?");
        if (confirm) {
            dispatch(promoteToManager(promotedAdminEmail));
        }
    };

    //update the admin information when getting the user details
    useEffect(() => {
        dispatch(searchAdminUsers(userCommunity));
    }, [dispatch, userCommunity, updatedUser, newCreatedAdmin]);

    return (
        <div>
            {loadingAdmin ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (<div>
                <Header />
                <div className="columns sidebar-content">
                    <div className="column is-one-fifth"><SideBar /></div>
                    <div className="column is-four-fifths ">
                        <div className="is-centered ml-6 mr-6 mt-6 background-white is-size-5">
                            <div className="px-6 py-6">
                                {loadingAdmin ? (
                                    <LoadingBox></LoadingBox>
                                ) : error ? (
                                    <MessageBox variant="danger">{error}</MessageBox>
                                ) : (
                                    <div >
                                        <div className="has-text-right is-hovered mb-3"> <Link to="/admin/create-admin-account"> <button className="button is-white is-hovered is-size-5">Create a new administrator</button></Link></div>
                                        <div className="">
                                            <div className="columns has-text-weight-bold has-text-centered">
                                                <div className="column"> Admin Name</div>
                                                <div className="column is-one-third"> Email</div>
                                                <div className="column"> Register Time </div>
                                                <div className="column"> Actions</div>
                                            </div>
                                            {
                                                admins.map((currentUser) => (
                                                    <div className="columns has-text-centered" key={currentUser.email}>
                                                        <div className="column"> {currentUser.username} </div>
                                                        <div className="column is-one-third">{currentUser.email}</div>
                                                        <div className="column">{currentUser.registerTime.slice(0, 10)} </div>
                                                        <div className="column">
                                                            {
                                                                currentUser.manager ? (
                                                                    <div>&nbsp;</div>
                                                                ) : (
                                                                    <button className="button is-primary is-rounded" value={currentUser.email} onClick={promoteHandler}>Promote As Manager</button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>))
                                            }
                                        </div>

                                    </div>
                                )}
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
