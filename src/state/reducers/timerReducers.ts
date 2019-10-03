import { Reducer } from "redux";

import { IRootActions } from "../index";
import { Actions } from "../actions/constants";

import { Time } from "../../time";

export interface IStateTimer {
  counting: boolean;
  timeLeft: Time;
  duration: Time;
  notifications: ReadonlyArray<Notification>;
  timeLine: Time[];
}

const initialState: IStateTimer = {
  counting: false,
  timeLeft: new Time(0, 10),
  duration: new Time(0, 10),
  notifications: [],
  timeLine: [
    new Time(5, 10, "Coffe Break"),
    new Time(25, 0, "Lunch Break"),
    new Time(25, 0, "Pomodoro")
  ]
};

export const timerReducers: Reducer<IStateTimer, IRootActions> = (
  state = { ...initialState },
  action
) => {
  switch (action.type) {
    case Actions.SET_TIME:
      const time = Time.fromTime(action.payload);

      return {
        ...state,
        timeLeft: time,
        duration: time
      };

    case Actions.START_TIMER:
      state.notifications.forEach(notification => notification.close());

      return {
        ...state,
        timeLeft:
          state.timeLeft.toSeconds() !== 0 ? state.timeLeft : state.duration,
        counting: true,
        notifications: []
      };

    case Actions.STOP_TIMER:
      return {
        ...state,
        counting: false
      };

    case Actions.COUNT_DOWN_ONE_SECOND:
      return {
        ...state,
        timeLeft: state.timeLeft.reduceByOneSecond()
      };

    case Actions.COUNT_DOWN_FINISHED:
      return {
        ...state,
        timeLine: [...state.timeLine, action.payload]
      };

    case Actions.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };

    default:
      return state;
  }
};
