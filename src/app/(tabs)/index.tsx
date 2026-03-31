// ----- REACT NATIVE -----
import React, { JSX } from "react";
// ----- SCREENS -----
import HomeScreen from "../(screens)/HomeScreen";

/**
 * Home component renders the HomeScreen component.
 * This component is used as the home route in the app.
 * @returns {JSX.Element} The rendered HomeScreen component.
 */
export default function Index(): JSX.Element {
  return <HomeScreen />;
}
