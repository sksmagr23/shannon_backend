import mongoose from 'mongoose';

const DB_Connection = async (connection_string) => {
    try {
        await mongoose.connect(connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'hack_it_out'
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

export default DB_Connection;