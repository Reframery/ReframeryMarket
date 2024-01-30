import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "app/store"
import { setSearchParams } from "features/searchSlice"
import { Search } from "lucide-react"

export default function SearchBar(props: { community: string }) {
  const dispatch = useDispatch()
  const { community } = props

  const navigate = useNavigate()
  const location = useLocation()

  const [page, limit] = [1, 5]

  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const searchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      setSearchParams({
        community,
        searchTerm,
        category,
        subcategory,
        page,
        limit,
      })
    )
    if (!location.pathname.startsWith("/search")) navigate("/search")
  }

  const setCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const categoryValue = e.target.value
    if (categoryValue === "food" || categoryValue === "clothing") {
      setCategory("products")
      setSubcategory(categoryValue)
    } else if (
      categoryValue === "landscaping" ||
      categoryValue === "homemaintenance"
    ) {
      setCategory("services")
      setSubcategory(categoryValue)
    } else if (categoryValue === "consulting" || categoryValue === "training") {
      setCategory("expertises")
      setSubcategory(categoryValue)
    } else {
      setCategory(categoryValue)
      setSubcategory("")
    }
  }

  return (
    <div className="flex items-center">
      <select
        className="px-2 py-2.5 rounded-l-md"
        value={subcategory ? subcategory : category}
        onChange={setCategoryHandler}
      >
        <option key="All" value="All">
          All
        </option>
        <option key="Product" value="products">
          Product
        </option>
        <option key="Food" value="food">
          {" "}
          &nbsp; &nbsp; Food
        </option>
        <option key="Clothing" value="clothing">
          {" "}
          &nbsp; &nbsp; Clothing
        </option>
        <option key="Service" value="services">
          Service
        </option>
        <option key="Landscaping" value="landscaping">
          {" "}
          &nbsp; &nbsp; Landscaping
        </option>
        <option key="Homemaintenance" value="homemaintenance">
          {" "}
          &nbsp; &nbsp; Home maintenance
        </option>
        <option key="Expertise" value="expertises">
          Expertise
        </option>
        <option key="Consulting" value="consulting">
          {" "}
          &nbsp; &nbsp; Consulting
        </option>
        <option key="Training" value="training">
          {" "}
          &nbsp; &nbsp; Training
        </option>
      </select>
      <input
        type="text"
        className="p-2 border-l-black border"
        placeholder="Search items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="px-2 py-[9px] rounded-r-md bg-orange-400 hover:bg-orange-500 transition-colors"
        onClick={searchHandler}
      >
        <Search />
      </button>
    </div>
  )
}
