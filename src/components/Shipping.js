import React from "react";

class Shipping extends React.Component {
    render (){
        return(
            <div className="box">
                <div className="field">
                    <label className="checkbox">
                        <input type="checkbox"/>
                        Use the default address from <a href="#">account profile</a>
                    </label>
                </div>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="e.g. Micheal Lee"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Address (Line 1)</label>
                    <div className="control">
                        <input type="text" className="input"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Address (Line 2)</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="optional"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="e.g. 3658882466"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="e.g. reframery@gmail.com"/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Shipping;