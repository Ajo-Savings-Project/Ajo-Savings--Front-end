import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import authReducer from "../slices/userSlice";
import targetReducer from "../slices/targetSlice";
import AllGroupsReducer from "../slices/getAllGroupSlice";
import AllGroupsMemberReducer from "../slices/getGroupMemberSlice";
import PaymentReducer from "../slices/paymentSlice";
import transactionReducer from "../slices/transactionSlice";
import CreateGroupReducer from "../slices/createGroupSlice";
import getUserSettingReducer from "../slices/settingSlice";
import activitiesReducer from "../slices/activitiesSlice";
import thunk from "redux-thunk";
import userAuthReducer from "../slices/userSlice";
import groupSavingReducer from "../slices/groupSavingSlice";
import personalSavingsReducer from "../slices/personalSavingsSlice";
import GlobalWalletReducer from "../slices/getGlobalWalletSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    targets: targetReducer,
    payment: PaymentReducer,
    allGroupsWithMember: AllGroupsMemberReducer,
    allGroups: AllGroupsReducer,
    groups: CreateGroupReducer,
    transaction: transactionReducer,
    setting: getUserSettingReducer,
    activities: activitiesReducer,
    kyc: userAuthReducer,
    groupSavings: groupSavingReducer,
    personalSavings: personalSavingsReducer,
    globalSavings: GlobalWalletReducer,
    // groups: createGroupReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
