import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../reducer'

export default configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
