'use strict'

const connectDB = require('./db');
const {ObjectId} = require("mongodb")
const errorHandler = require("./errorHandler")


module.exports = {
    getCourses: async () => {
        let db, courses = [];
        try{
            db = await connectDB();
            courses = await db.collection('courses').find().toArray();
        }catch(error){
            errorHandler(error)
        }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let db, course;
        try{
            db = await connectDB();
            course = await db.collection('courses').findOne({ _id: ObjectId(id) });
        }catch(error){
            errorHandler(error)
        }
        return course;
    },
    //People
    getPeople: async () => {
        let db, students = [];
        try{
            db = await connectDB();
            students = await db.collection('students').find().toArray();
        }catch(error){
            errorHandler(error)
        }
        return students;
    },
    getPerson: async (root, { id }) => {
        let db, student;
        try{
            db = await connectDB();
            student = await db.collection('students').findOne({ _id: ObjectId(id) });
        }catch(error){
            errorHandler(error)
        }
        return student;
    },
    searchItems: async(root, {keyword}) => {
        let db, items, courses, people;
        try{
            db = await connectDB();
            courses = await db.collection("courses").find({$text:{$search: keyword} }).toArray();
            people = await db.collection("students").find({$text:{$search: keyword} }).toArray();

            items = [...courses, ...people];
        }catch(error){
            errorHandler(error)
        }
        return items;
    }
}