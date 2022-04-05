import {Campaign} from "@interfaces/campaign";

export interface StepProps {
  campaign: Campaign;
  onNext?: (success: boolean) => void
}
