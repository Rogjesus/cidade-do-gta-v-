import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./screens/HomeScreen";
import { RestaurantScreen } from "./screens/RestaurantScreen";
import { ChatScreen } from "./screens/ChatScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "FoodBuddy"
                }}
            />
            <StackNavigator.Screen
                name="Restaurant"
                component={RestaurantScreen}
                options={({ route }) => ({
                    title: route.params.name
                })}
            />
            <StackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    title: "Assistente Virtual"
                }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);