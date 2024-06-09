// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import StackNavigator from "./navigation/stacknavigator";
// import authReducer from "./state";
// import { configureStore } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { PersistGate } from "redux-persist/integration/react";

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// };
// const persistedReducer = persistReducer(persistConfig, authReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistStore(store)}>
//         <StackNavigator />
//       </PersistGate>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
