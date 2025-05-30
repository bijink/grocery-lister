import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoment(time: number) {
  return moment(time).calendar(moment(), {
    sameDay: '[Today] [at] h:mma',
    lastDay: '[Yesterday] [at] h:mma',
    lastWeek: 'DD MMM [at] h:mma',
    sameElse: 'DD MMM [at] h:mma',
  });
}
