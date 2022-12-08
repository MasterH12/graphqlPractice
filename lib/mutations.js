'use strict'

const connectDB = require("./db")
const {ObjectId} = require("mongodb")
const errorHandler = require("./errorHandler")

module.exports = {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: "",
            topic: ""
        }

        const newCourse = Object.assign(defaults, input);
        let db;
        let course;
        try{
            db = await connectDB();
            course = await db.collection("courses").insertOne(newCourse)
            newCourse._id = course.insertedId
        }catch(error){
            errorHandler(error);
        }
        return newCourse;
    },

    editCourse: async (root, { id, input }) => {

        let db;
        let course;
        try{
            db = await connectDB();
            await db.collection("courses").updateOne(
                { _id: ObjectId(id) },
                { $set: input }
            )
            course = await db.collection("courses").findOne(
                { _id: ObjectId(id) }
            )
        }catch(error){
            errorHandler(error);
        }
        return course;
    },

    deleteCourse: async (root, { id }) => {
        let db, info;
        try{
            db = await connectDB();
            info = await db.collection("courses").deleteOne({_id: ObjectId(id)});
            if(info.deletedCount > 0) return true;
            else return false;
        }catch(error){
            errorHandler(error);
        }
    },

    addStudent: async (root, {studentId, courseId}) => {
        let db, course, student;
        try{
            db = await connectDB();
            course = await db.collection("courses").findOne({_id: ObjectId(courseId)});
            student = await db.collection("students").findOne({_id: ObjectId(studentId)});
            if (!course || !student ) throw new Error("El estudiante o el curso no existe");
            await db.collection("courses").updateOne(
                { _id: ObjectId(courseId) },
                { $addToSet:{students: ObjectId(studentId)} }
            );

        }catch(error){
            errorHandler(error);
            return error;
        }
        return course;
    },


    createPerson: async (root, { input }) => {
        let db;
        let student;
        try{
            db = await connectDB();
            student = await db.collection("students").insertOne(input)
            input._id = student.insertedId
        }catch(error){
            errorHandler(error);
        }
        return input;
    },

    editPerson: async (root, { id, input }) => {

        let db;
        let student;
        try{
            db = await connectDB();
            await db.collection("students").updateOne(
                { _id: ObjectId(id) },
                { $set: input }
            )
            student = await db.collection("students").findOne(
                { _id: ObjectId(id) }
            )
        }catch(error){
            errorHandler(error);
        }
        return course;
    },
    deletePerson: async (root, { id }) => {
        let db, info;
        try{
            db = await connectDB();
            info = await db.collection("students").deleteOne({_id: ObjectId(id)});
            if(info.deletedCount > 0) return true;
            else return false;
        }catch(error){
            errorHandler(error);
        }
    },
}