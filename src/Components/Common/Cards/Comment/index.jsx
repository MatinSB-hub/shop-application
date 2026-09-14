import { toHijriDate } from "../../../../lib/helpers/date";
import Message from "./Fragments/Message";
import UserProfile from "./Fragments/UserProfile";
import { FaStar } from "react-icons/fa";

const Comment = ({ content, rating, updatedAt, user }) => {
  const lastUpdate = toHijriDate(updatedAt);
  return (
    <article className="p-4 space-y-3 rounded-lg border border-slate-200 py-6">
      <div className="flex-between">
        <UserProfile name={user.phone} />
        <div className="flex gap-5">
          <div className="flex">
            {Array.from({ length: rating }).map(() => (
              <FaStar className="text-amber-300" />
            ))}
          </div>
          <div className="text-xs text-slate-400">{lastUpdate}</div>
        </div>
      </div>
      <Message message={content} />
    </article>
  );
};

export default Comment;
