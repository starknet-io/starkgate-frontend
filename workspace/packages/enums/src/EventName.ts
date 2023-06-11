export type IEventName = {
  [event: string]: string;
};

export enum EventNameL1 {
  LOG_DEPOSIT = 'LogDeposit',
  LOG_WITHDRAWAL = 'LogWithdrawal',
  LOG_MESSAGE_TO_L2 = 'LogMessageToL2'
}

export type EventsName = {
  L1: IEventName;
  L2: null;
};

export const EventName: EventsName = {
  L1: EventNameL1,
  L2: null
};
