import Post from "../post/Post";
import Share from "../share/Share";
import "./timeline.css";
import { Posts } from "../../dummyData";

export default function Feed() {
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
