

async function verifyUser(db, username, password) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
            return {'status': 'error', 'message': 'Database not connected.'};
        }
        const user = await db.collection("login").findOne({username: username});
        if (!user) {
            return {'status': 'error', 'message': 'Invalid username'};
        }
        if (user['password'] == password) {
            user.status = 'success';
            user.message = 'Successfully logged in.';
            return user;
        }
        return {'status': 'error', 'message': 'Invalid Password'};
    }
    catch (error) {
        console.error('Database Connection Error at Login Username', error);
        return {'status': 'error', 'message': 'Cannot verify user at this time.'};
   }
}


module.exports = {
    verifyUser
}