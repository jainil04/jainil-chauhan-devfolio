import AnimatedHeadline from '@/components/AnimatedHeadline';
import TypedHeadline from '@/components/TypedHeadline';
import { isAnimatedHeadlineEnabled, isTypedHeadlineEnabled } from "../configs";

export default function Home() {
  return (
    <div className="min-h-screen pt-16">
      {isAnimatedHeadlineEnabled && <AnimatedHeadline />}
      {isTypedHeadlineEnabled && <TypedHeadline />}
    </div>
      // https://ui.shadcn.com/docs/components/button
  );
}
