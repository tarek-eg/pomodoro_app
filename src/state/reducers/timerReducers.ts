import { Reducer } from "redux";

import { IRootActions } from "../index";
import { Actions } from "../actions/constants";

import { Time } from "../../time";
import { SimpleTime } from "../epics/cacheEpics";

export interface IStateTimer {
  counting: boolean;
  timeLeft: Time;
  duration: Time;
  notifications: ReadonlyArray<Notification>;
  timeLine: Time[];
}

export const getCache = (): Time[] | undefined => {
  try {
    let cachedData = localStorage.getItem("cache");

    if (cachedData) {
      let t = JSON.parse(cachedData);

      return t.timeLine.map(
        (time: SimpleTime) => new Time(time.minutes, time.seconds, time.name)
      );
    }
  } catch (e) {}
};

const initialState: IStateTimer = {
  counting: false,
  timeLeft: new Time(0, 10),
  duration: new Time(0, 10),
  notifications: [],
  timeLine: getCache() || []
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
    case Actions.DELETE_POMODORO: {
      const timeLine = [...state.timeLine];
      timeLine.splice(action.payload, 1);

      return {
        ...state,
        timeLine
      };
    }

    default:
      return state;
  }
};
