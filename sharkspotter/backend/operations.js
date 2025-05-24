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



async function insert(db, date_input, scale_input, datetime_input) {
    try {
        if (!db) {
            console.error('DB Not connected yet')
        }
        const day_input = db.collection("login");
        await day_input.insertOne({
            date: date_input,
            scale: scale_input, 
            datetime: datetime_input,
        });
        console.log('Inserted');
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
    //await insertTime(db);
    await insert(db, 'today lol', 100, 'timelol');
    //await insertNight(db, 'today lol', '11:00', '12:00');
    await retrieveList(db, 'login');
}


execute();
//updateMany, deleteone, replaceOne
module.exports = {
    connect,
    insert,
    retrieveList
}