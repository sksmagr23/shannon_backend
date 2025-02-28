import mongoose from 'mongoose';


function DB_Connection(url) {
    mongoose.connect(url).then(() => {
      console.log(`DB with url ${url} connected scussfully`)
    }
    ).catch((error ) => {
      console.log(`Error ${error.message}`);
    }
    )
}
export default DB_Connection;