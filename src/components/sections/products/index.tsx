import { useState } from "react"
import Catalog from "./Catalog"
import Selector from "./Selector"

const Products = () => {
    const [activeTab, setActiveTab] = useState<string>("All")
    const getActiveTab = (tab: string) => {
        setActiveTab(tab)
    }
  return (
    <div className="mt-6">
        <Selector getActiveTab={getActiveTab} />
        <Catalog activeTab={activeTab} />
    </div>
  )
}

export default Products
