import { PiHandWaving } from "react-icons/pi";

export default function Headline() {
  return (
    <div className="p-2">
      <div className="unbounded-headline-title flex justify-center flex-wrap text-center">
        <span className="inline-flex items-center gap-1">
          Hi <PiHandWaving className="inline-block" />,&nbsp;
        </span>
        I’m Jainil Chauhan, a Front-End Developer.
      </div>
      <div className="unbounded-headline-subtitle flex justify-center">
        I build responsive, accessible, and performant interfaces.
      </div>
    </div>
  );
}
