

async function verifyUser(db, username, password) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
            return false;
        }
        const user = await db.collection("login").findOne({username: username});
        if (!user) {
            return {'status': 'error', 'err_msg': 'Invalid username'};
        }
        if (user['password'] == password) {
            user.status = 'success';
            return user;
        }
        return {'status': 'error', 'err_msg': 'Invalid Password'};
    }
    catch (error) {
        console.error('Database Connection Error at Login Username', error);
        return false;
   }
}


module.exports = {
    verifyUser
}