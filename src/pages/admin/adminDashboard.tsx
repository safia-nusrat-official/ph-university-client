import { NavLink } from "react-router-dom"

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="font-semibold mb-6 text-xl">AdminDashboard</h1>
      <NavLink to="/admin/create-admin" className="text-blue-700 underline">Go to create admin</NavLink>
    </div>
  )
}

export default AdminDashboard