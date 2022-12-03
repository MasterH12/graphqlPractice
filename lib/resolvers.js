'use strict'

const connectDB = require('./db');
const {ObjectID} = require("mongodb")

const mutations = require("./mutations");
const querys = require("./querys");
const types = require("./types")

module.exports = {
    Query: querys,
    Mutation : mutations,
    ...types
  }