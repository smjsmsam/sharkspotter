import { run } from './db_connect.js';
import { connect, insert, retrieveList, update } from './operations.js';


async function verifyUser(db, username, password) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
            return false;
        }
        const user = await db.collection("login").findOne({username: username});
        if (user && user['password'] == password) {
            localStorage.setItem("user", username);
            return true;
        }
        return false;
    }
    catch (error) {
        console.error('Database Connection Error at Login Username', error);
        return false;
   }
}