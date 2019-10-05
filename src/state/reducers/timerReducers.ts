import { Reducer } from "redux";

import { IRootActions } from "../index";
import { Actions } from "../actions/constants";

import { Time } from "../../time";
import { SimpleTime, storage } from "../epics/cacheEpics";
import { TimeTypes } from "../../components/pomodoroButtons";

export interface IStateTimer {
  counting: boolean;
  timeLeft: Time;
  duration: Time;
  notifications: ReadonlyArray<Notification>;
  timeLine: Time[];
  config: { [key: string]: Time } | null;
}

const initialState: IStateTimer = {
  counting: false,
  timeLeft: new Time(25, 0, TimeTypes.POMODORO),
  duration: new Time(25, 0, TimeTypes.POMODORO),
  notifications: [],
  timeLine: storage.getTimeLineFromCache() || [],
  config: storage.getConfigFromCache() || {}
};

export const timerReducers: Reducer<IStateTimer, IRootActions> = (
  state = { ...initialState },
  action
) => {
  switch (action.type) {
    case Actions.SET_TIME:
      const time = Time.fromTime(action.payload);
      let newConfig;

      if (state.config) {
        newConfig = { ...state.config, [time.name]: time };
      } else {
        newConfig = { [time.name]: time };
      }
      console.log(newConfig);

      // storage.set()

      return {
        ...state,
        timeLeft: time,
        duration: time,
        config: newConfig
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
