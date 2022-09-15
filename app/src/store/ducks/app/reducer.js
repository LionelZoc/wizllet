import {
  SET_CURRENT_USER_ID,
  SET_USER_LOCALE,
  SAVE_USER,
  CLEAR_USER,
  SAVE_EVENT,
} from "store/ducks/app/actionTypes";
import { constants } from "react-redux-firebase";
import { actionTypes } from "redux-firestore";
const initialLocalState = {
  locale: "fr",
  currentUserId: null,
  displayUserQrCode: null,
  events: [],
  netInfo: {
    type: "none",
    isConnected: false,
    isInternetReachable: false,
    details: {},
    isFirebaseConnected: null,
    afterFirebaseLogin: false,
  },
};
const localeReducer = (state = initialLocalState, action) => {
  console.log("dispatch", action);
  switch (action.type) {
    case "CHANGE_CONNECTIVITY": {
      return {
        ...state,
        netInfo: {
          ...state.netInfo,
          type: action.payload.netState.type,
          isConnected: action.payload.netState.isConnected,
          isInternetReachable: action.payload.netState.isInternetReachable,
          details: action.payload.netState.details,
        },
      };
    }

    case "FIREBASE_CONNECTIVITY_CHANGE": {
      return {
        ...state,
        netInfo: {
          ...state.netInfo,
          isFirebaseConnected: action.payload,
        },
      };
      //}
      //return state;
    }
    case SAVE_EVENT: {
      return { ...state, events: [...state.events, action.payload] };
    }
    case CLEAR_USER: {
      return { ...state, currentUser: null };
    }
    case SET_CURRENT_USER_ID: {
      return { ...state, currentUserId: action.payload };
    }
    case SAVE_USER: {
      return { ...state, currentUser: action.payload };
    }
    case SET_USER_LOCALE: {
      //("set user locale", action);
      if (action.locale !== state.locale) {
        //(" action.locale !== state.locale", action);
        return Object.assign({}, state, { locale: action.locale });
      } else return state;
    }
    case constants.actionTypes.SET_PROFILE: {
      if (action.profile) {
        return {
          ...state,
          cachedProfile: action.profile,
        };
      }
      return state;
    }
    case constants.actionTypes.LOGIN: {
      return {
        ...state,
        netInfo: {
          ...state.netInfo,
          afterFirebaseLogin: true,
        },
      };
    }

    //@@reduxFirestore/GET_SUCCESS
    case constants.actionTypes.LOGIN_ERROR: {
      return {
        ...state,
        netInfo: {
          ...state.netInfo,
          afterFirebaseLogin: false,
        },
      };
    } //look for reduxFirestore/Get_SUccess when get gives an answer @@reduxFirestore/GET_REQUEST
    case actionTypes.CLEAR_DATA: {
      return {
        ...initialLocalState,
        locale: state.locale,
        netInfo: state.netInfo,
      };
    }
    default:
      return state;
  }
};

export default localeReducer;
