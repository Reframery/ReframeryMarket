import React from 'react'
import { Link } from 'react-router-dom'
export default function WellcomeComponent() {
    return (
        <div className="left">

            <div className="head">
                <Link to="/"><img
                    className="logo"
                    src="/images/logo.png"
                    alt="logo"
                    width="100"
                ></img ></Link>
                <Link  to="/"><div className="text link">
                <div >Reframery Marketplace</div>
                </div></Link>
            </div>

            <div className="description">
                <h2>
                    Why Reframery？
                        </h2>
                <div>
                    <ul>
                        <li>You do not need real money to start your business</li>
                        <li>Provide a real-world business experience</li>
                        <li>Resources available for entrepreneurship</li>
                    </ul>
                </div>
            </div>
            <div className="image">
                <img
                    src="/images/signup.png"
                    alt="logo"
                ></img>
            </div>
        </div>
    )
}
