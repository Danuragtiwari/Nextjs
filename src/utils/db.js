import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://danurag23:Danuragtiwari232002@ac-c8hqkop-shard-00-00.flogmnt.mongodb.net:27017,ac-c8hqkop-shard-00-01.flogmnt.mongodb.net:27017,ac-c8hqkop-shard-00-02.flogmnt.mongodb.net:27017/?replicaSet=atlas-wap4t4-shard-0&ssl=true&authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Connection error:', error.message);
    }
};

export default connectDB;