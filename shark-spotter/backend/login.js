import { run } from './db_connect.js';
import { connect, insert, retrieveList, update } from './operations.js';


async function verifyUser(db, email, password) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
            return false;
        }
        const user = await db.collection("login").findOne({email: email});
        if (user && user['password'] == password) {
            // set cookie here for id, username
            // const userFound = await db.collection("login").findOne({_id: user["_id"]});  // just checking
            if (!userFound) {
                console.log(":( oh no");
                return false;
            }
            console.log("YAY");
            return true;
        }
        return false;
    }
    catch (error) {
        console.error('Database Connection Error at Login Username', error);
        return false;
   }
}

const db = await connect();
verifyUser(db, "email", "pass");