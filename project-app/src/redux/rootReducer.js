import { combineReducers } from "redux";
import userReducer from "./Authentication/userReducer";
import imageReducer from './image/imageReducer';
import LangReducer from "./Language/LangReducer";
import videoReducer from './video/videoReducer';

const rootReducer = combineReducers({
  users: userReducer,
  locale: LangReducer,
  image:imageReducer,
  video:videoReducer
});

export default rootReducer;
