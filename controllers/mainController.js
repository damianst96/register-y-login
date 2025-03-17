const { validationResult } = require("express-validator");
let fs = require("fs");
const path = require("path");
const session = require("express-session");
const User = require("../data/models/User");
const bcrypt = require("bcryptjs");
const db = require('../data/models/User');

const jsonUsersFile = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(jsonUsersFile, 'utf-8'));

const usersService = require("../data/usersService");

const controller = {
    index: function(req, res){
        res.render("index", {
            user: req.session.userLogged
        })
    },

    login: function(req, res){
        res.render("login");
    },

    loginProcess: async function(req, res){
        usersService.loginProcess(req, res);
    },

    register: function(req, res){
        res.render("register");
    },

    registerProcess: async function(req, res){
        usersService.registerProcess(req, res);
    },

    edit: function(req, res){
        usersService.edit(req, res);
    },

    delete: async function(req, res){
        usersService.delete(req, res);
    },

    profile: function(req, res){
        usersService.profile(req, res);
    },

    logout: function(req, res){
        usersService.logout(req, res);
    }
}

module.exports = controller;