import { db } from "./databaseConnection.js";

export const ordersCollection = db.collection("orders");
export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");