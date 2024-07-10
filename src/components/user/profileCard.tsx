import { getUser } from "../../redux/features/auth/authSlice"
import { useAppSelector } from "../../redux/hooks"

const ProfileCard = () => {
    const user = useAppSelector(getUser)

  return (
    <div className="bg-blue-950 m-4 rounded-md p-4 text-white">
        <h4>Id: {user?.userId}</h4>
        <h4>Role: {user?.role}</h4>
    </div>
  )
}

export default ProfileCard