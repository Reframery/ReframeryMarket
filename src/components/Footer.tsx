import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div className="flex justify-center p-4 py-5 bg-gray-100 mt-auto">
      <div className="max-w-5xl w-full flex items-center justify-between font-medium">
        <Link to="/terms-and-conditions">Terms and Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/development-team">Development Team</Link>
      </div>
    </div>
  )
}
