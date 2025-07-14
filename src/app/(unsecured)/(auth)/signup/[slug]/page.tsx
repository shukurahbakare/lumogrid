import Step1 from "../_components/(steps)/Step1";
import Step2 from "../_components/(steps)/Step2";
import Step3 from "../_components/(steps)/Step3";

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
        return <div>step 4</div>;
      case '5':
        return <div>step 5</div>;
      case '6':
        return <div>step 6</div>;
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