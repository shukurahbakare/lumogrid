import Step1 from "../_components/(steps)/Step1";
import Step2 from "../_components/(steps)/Step2";
import Step3 from "../_components/(steps)/Step3";
import Step4 from "../_components/(steps)/Step4";
import Step5 from "../_components/(steps)/Step5";
import Step6 from "../_components/(steps)/Step6";

export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const renderStepContent = () => {
    switch(slug) {
      case '1':
        return <Step1/>;
      case '2':
        return <Step2/>;
      case '3':
        return <Step3/>;
      case '4':
        return <Step4/>;
      case '5':
        return <Step5/>;
      case '6':
        return <Step6/>;
      default:
        return <div>Invalid step number</div>;
    }
  };

  return (
    <div>
      {renderStepContent()}
    </div>
  );
}