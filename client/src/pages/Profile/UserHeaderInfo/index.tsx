import { Link } from "react-router-dom";
import { LinkButton } from "@/components";
import { TUserTypeWithoutToken } from "@/types";

interface IProps {
  user: TUserTypeWithoutToken;
  userLooged: string;
}

export default function UserHeaderInfo({ user, userLooged }: IProps) {
  return (
    <section className="w-full flex items-center flex-col gap-1 px-4">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-300">
        <span className="text-2xl font-medium text-primary-gray">
          {user.first_name.charAt(0).toLocaleUpperCase()}
        </span>
      </div>
      <h3 className="text-3xl text-primary-gray font-medium">
        {user.first_name.charAt(0).toUpperCase() +
          user.first_name.slice(1).toLowerCase() +
          " "}
        {user.last_name.charAt(0).toUpperCase() +
          user.last_name.slice(1).toLowerCase()}
      </h3>
      <h5 className="text-sm text-secondary-gray">{user.email}</h5>
      {userLooged === user.id && (
        <Link to={`/profile/${user.id}/edit`}>
          <LinkButton className="bg-gray-300 rounded-full">
            Edit profile
          </LinkButton>
        </Link>
      )}
      <span className="font-medium border-b border-black mt-2 text-sm">
        Created
      </span>
    </section>
  );
}
