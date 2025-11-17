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
export interface Slide {
  id: number;
  startYear: string;
  endYear: string;
  title: string;
}
export interface Event {
  id?: number;
  year: string;
  text: string;
  description?: string;
}