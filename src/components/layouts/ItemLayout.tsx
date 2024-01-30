import { Outlet } from "react-router-dom"
import SideBar from "components/SideBar"

export default function ItemLayout() {
  return (
    <div className="flex flex-grow">
      <SideBar />
      <section className="p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </section>
    </div>
  )
}
