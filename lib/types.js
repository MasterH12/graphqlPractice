'use strict'

const connectDB = require("./db")
const {ObjectId} = require("mongodb")
const errorHandler = require("./errorHandler")

module.exports = {
    Course: {
        students: async ({students}) => {
            let db, studentsData, ids;
            try{
                db = await connectDB();
                ids = students ? students.map( id => ObjectId(id)) : [];

                studentsData = ids.length > 0  
                    ? await db.collection("students").find( //Si hay ids se obtiene cada student en un array
                        { _id:{$in: ids} }
                    ).toArray() 
                    : []; //Si no hay ids se retorn un array vacio
            }catch(error){
                errorHandler(error)
            }
            return studentsData;
        }
    },
    Person:{
        __resolveType: (person, context, info) => {
            if(person.phone){
                return "Monitor";
            }else{
                return "Student";
            }
        }
    },
    GlobalSearch:{
        __resolveType: (item, context, info) => {
            if(item.title){
                return 'Course'
            }else if(item.phone){
                return 'Monitor'
            }else{
                return 'Student'
            }
        }
    }
}