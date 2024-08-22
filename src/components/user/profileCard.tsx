import { getUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const ProfileCard = () => {
  const user = useAppSelector(getUser);

  return (
    <div className="flex gap-6 font-semibold">
      <h4>Id: {user?.userId}</h4>
      <h4>Role: {user?.role}</h4>
    </div>
  );
};

export default ProfileCard;
