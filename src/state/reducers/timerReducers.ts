import { Reducer } from "redux";

import { IRootActions } from "../index";
import {
  COUNT_DOWN_ONE_SECOND,
  SET_TIME,
  START_TIMER,
  STOP_TIMER,
  ADD_NOTIFICATION
} from "../actions/constants";

import { Time } from "../../time";

export interface IStateTimer {
  counting: boolean;
  timeLeft: Time;
  duration: Time;
  notifications: ReadonlyArray<Notification>;
}

const initialState: IStateTimer = {
  counting: false,
  timeLeft: new Time(0, 10),
  duration: new Time(0, 10),
  notifications: []
};

export const timerReducers: Reducer<IStateTimer, IRootActions> = (
  state = { ...initialState },
  action
) => {
  switch (action.type) {
    case SET_TIME:
      const time = Time.fromTime(action.payload);

      return {
        ...state,
        timeLeft: time,
        duration: time
      };

    case START_TIMER:
      state.notifications.forEach(notification => notification.close());

      return {
        ...state,
        timeLeft:
          state.timeLeft.toSeconds() !== 0 ? state.timeLeft : state.duration,
        counting: true,
        notifications: []
      };

    case STOP_TIMER:
      return {
        ...state,
        counting: false
      };

    case COUNT_DOWN_ONE_SECOND:
      return {
        ...state,
        timeLeft: state.timeLeft.reduceByOneSecond()
      };

    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };

    default:
      return state;
  }
};
