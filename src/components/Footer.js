import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer">
      <div className="text">
        <div><Link to="/terms-and-conditions">Terms and Conditions</Link></div>
        <div><Link to="/privacy-policy">Privacy Policy</Link></div>
        <div><Link to="/development-team">Development Team</Link></div>
      </div>
    </div>
  );
}
