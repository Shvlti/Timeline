export interface TimelineEvent {
  id: number;
  year: string;
  description: string;
}

export interface TimePeriod {
  id: number;
  yearsOne: string;
  yearsTwo: string;
  title: string;
  events: TimelineEvent[];
}

export interface TimelineData {
  periods: TimePeriod[];
}