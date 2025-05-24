const {run} = require('./db_connect')

async function connect() {
    try {
        const db = await run();
        return db;
    }
    catch (error) {
        console.error('DB Connection Error in operations');
    }
}



async function insert(db, username, email, password) {
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const login = db.collection("login");
        await login.insertOne({
            username: username,
            email: email,
            password: password,
            report: []
        });
        console.log('Inserted');
    }
    catch (error) {
        console.error('Insert error', error);
        process.exit();
   }
}



async function update(db, email, new_report) { 
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const reports = db.collection("login");
        await reports.updateOne(
            {email: email,}, // find
            {$push: {report: new_report} } // update the value in that set
        );
        const community_reports = db.collection("CommunityReports");
        await insertCommunityReport(db, new_report);
        console.log('Updated');
    }
    catch (error) {
        console.error('Update error', error);
    }
}


async function insertResources(db, type, resource) {
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const community_reports = db.collection("Resources");
        if (type === "period") {
            await community_reports.insertOne({
                period: resource
            });
            console.log('Inserted Period');
        }
        if (type === "bathroom") {
            await community_reports.insertOne({
                bathroom: resource
            });
            console.log('Inserted Bathroom');
        }
    }
    catch (error) {
        console.error('Insert error', error);
        process.exit();
   }
}



async function insertCommunityReport(db, report) {
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const community_reports = db.collection("CommunityReports");
        await community_reports.insertOne({
            report
        });
        console.log('Inserted Community Report');
    }
    catch (error) {
        console.error('Insert error', error);
        process.exit();
   }
}

async function retrieveList(db, collection_name) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
        }
        const collection = db.collection(collection_name);
        const documents = await collection.find({}).toArray();
        console.log('Documents:', documents);
        return documents;
    } catch (error) {
        console.error('Fetch error', error);
    }
}


async function execute() {
    const db = await connect();
    //await insert(db, 'name lol', "email", "pass");
    //await retrieveList(db, 'login');
    //await update(db, 'email', "REPORT ADD LOL")
    //await retrieveList(db, 'CommunityReports');
    await insertResources(db, 'bathroom', "bathroom place")
    await retrieveList(db, 'Resources');
}


execute();
//updateMany, deleteone, replaceOne
module.exports = {
    connect,
    insert,
    retrieveList,
    update,
    insertResources,
    insertCommunityReport
}