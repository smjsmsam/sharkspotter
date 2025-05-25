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



async function insert(db, username, password) {
    try {
        if (!db) {
            console.error('DB Not connected yet')
            return {'status': 'error', 'message': 'Database not connected.'};
        }
        const login = db.collection("login");
        await login.insertOne({
            username: username,
            password: password,
            report: []
        });
        console.log('Inserted');
        return {'status': 'success', 'message': 'Successfully created a new User.'};
    }
    catch (error) {
        console.error('Insert error', error);
        process.exit();
   }
}



async function addReport(db, username, new_report) { // update personal report and then add to community reports
    try {
        if (!db) {
            console.error('DB Not connected yet')
            return {'status': 'error', 'message': 'Database not connected.'}; 
        }
        const reports = db.collection("login");
        await reports.updateOne(
            {username: username,}, // find
            {$push: {report: new_report}} // update the value in that set
        );
        console.log("Inserted user report");
        await insertCommunityReport(db, new_report);
        console.log('Inserted community report');
        return {'status': 'success', 'message': 'Successfully added report.'};
    }
    catch (error) {
        console.error('Update error', error);
    }
}


async function insertCommunityReport(db, report) { // community reports added to previous function
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

async function retrieveList(db, collection_name, user=null) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
        }
        const collection = db.collection(collection_name);
        let documents;
        if (!user) {
            const allReports = await collection.find({}, {projection: {_id: 0, timestamp: 0}}).toArray();
            documents = {
                report: allReports
            };
        } else {
            documents = await collection.findOne(
                {username: user}, 
                {projection: {_id: 0, report: 1, type: 1}},
            );
        }
        // console.log('Documents:', documents);
        return documents;
    } catch (error) {
        console.error('Fetch error', error);
        return {'status': 'error', 'message': 'Cannot retrieve ' + collection_name + ' at this time.'};
    }
}

async function getMarker(db, markerID) {
    try {
        if (!db) {
            console.error('DB Not connected yet');
        }
        const marker = await db.collection("CommunityReports").findOne({"report.reportID": markerID});
        if (marker.report) {
            console.log(marker.report);
            marker.report.status = 'success';
        }
        return marker.report;
    } catch (error) {
        console.error('Fetch error', error);
        return {'status': 'error', 'message': 'Cannot retrieve markers at this time.'};
    }
}




// example
let user = {'username': 's1'};
const jsonReport = {
    'title': 'crime 1',
    'body': 'this is a crime of 1.',
    'author': user.username,
    'reportID': '123',
    'longitude': '1234',
    'latitude': '5678',
    'location': 'Irvine, CA',
    'timestamp': new Date(),
    'type': 'crime',
}

async function execute() {
    const db = await connect();
    //await insert(db, 'name lol', "email", "pass");
    //await retrieveList(db, 'login');
    //await update(db, 'email', "REPORT ADD LOL")
    // await retrieveList(db, 'CommunityReports'); 
    //await insertResources(db, 'bathroom', "bathroom place")
    // await addReport(db, 's1', jsonReport);
    // await addReport(db, 's1', jsonReport);
    // await addReport(db, 's1', jsonReport);
    // await retrieveList(db, 'login', 's1');
    // await getMarker(db, 1);
}


// execute();
//updateMany, deleteone, replaceOne
module.exports = {
    connect,
    insert,
    retrieveList,
    addReport,
    insertResources,
    insertCommunityReport,
    getMarker
}