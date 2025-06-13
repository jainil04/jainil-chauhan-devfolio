import AnimatedHeadline from '@/components/AnimatedHeadline';
import Headline from '@/components/Headline';
import TypedHeadline from '@/components/TypedHeadline';
import {
  isAnimatedHeadlineEnabled,
  isNewHeadline,
  isTypedHeadlineEnabled,
} from "../configs";

export default function Home() {
  return (
    <div className="">
      {isAnimatedHeadlineEnabled && <AnimatedHeadline />}
      {isTypedHeadlineEnabled && <TypedHeadline />}
      {isNewHeadline && <Headline />}
    </div>
  );
}
