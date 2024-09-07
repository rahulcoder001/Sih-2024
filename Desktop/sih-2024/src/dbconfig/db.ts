
import mongoose from 'mongoose';

const dbconnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    return mongoose.connect(process.env.MONGODB_URI!, {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export { dbconnect };
