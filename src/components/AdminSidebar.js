import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

export default function AdminSidebar() {
    const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
    return (
        <div className="ml-6">
            <div >
                <div >
                    <Link to="/">
                        <img className="logo" src="/images/logo.png" alt="logo" width="100" ></img >
                    </Link>
                </div>

                <div className="is-size-5 has-text-weight-semibold">
                    <div className="">
                        <Link to="/admin"><div className="link my-3" > My Admin</div></Link>
                        <Link to="/admin/awaiting-validation"><div className="link my-3">Awaiting Validation</div></Link>
                        {/* The following two links are shown only for a super admin */}
                        {userInfo.manager && <Link to="/admin/search-user"><div className="link my-3">Search Users</div></Link>}
                        {userInfo.manager && <Link to="/admin/administrator-management"><div className="link my-3">Administrators</div></Link>}
                        <Link to="/admin/my-profile"><div className="link">Account Setting</div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



