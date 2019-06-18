import mongoose from 'mongoose';
import {
	MongoMemoryServer
} from 'mongodb-memory-server';

export class Mongo {

	Mongo() {
		mongoose.Promise = Promise;
	}

	connection(InMemory = false) {
		if (InMemory) {
			this.connectionInMemory('notimetube');
		} else {
			this.toConnect(process.env.DB_URL);
		}
	}

	connectionInMemory(mongoUri) {
		const mongoServer = new MongoMemoryServer();
		mongoServer.getConnectionString().then((mongoUri) => {
			this.toConnect(mongoUri);
		});
	}

	toConnect(mongoUri) {
		mongoose.connect(mongoUri);

		mongoose.connection.on('error', (e) => {
			if (e.message.code === 'ETIMEDOUT') {
				console.log(e);
				mongoose.connect(mongoUri);
			}
			console.log(e);
		});

		mongoose.connection.once('open', () => {
			console.log(`MongoDB successfully connected to ${mongoUri}`);
		});
	}
}