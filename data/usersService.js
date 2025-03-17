const { validationResult } = require("express-validator");
let fs = require("fs");
const path = require("path");
const session = require("express-session");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const db = require('./models');

const usersService = {

    loginProcess: async function(req, res){
        let userToLogin = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (userToLogin == null){
            return res.render('login', {
                errors: {
                    email: {
                        msg: "Usuario no encontrado"
                    }
                }
            })
        }

        if (bcrypt.compareSync(req.body.password, userToLogin.password)){
            req.session.userLogged = userToLogin;
            res.redirect('/profile');
        } else {
            // res.send("Credenciales invalidas");
            return res.render('login', {
                errors: {
                    email: {
                        msg: "Credenciales inválidas"
                    }
                }
            })
        }
    },

    registerProcess: async function(req, res){
        try {
            let validation = validationResult(req);

            if (validation.errors.length > 0){
                return res.render('register', {
                    errors: validation.mapped(),
                    oldData: req.body
                })
            }

            let userExists = await db.User.findOne({where: {
                email: req.body.email
            }})

            if (userExists != null){
                return res.render('register', {
                    errors: {
                        email: {
                            msg: "Ese email ya está registrado"
                        }
                    },
                    oldData: req.body
                })
            }

            // Verificar si ambas pass del registro son iguales
            let hashedPass = bcrypt.hashSync(req.body.password, 10);
            let equalPass = bcrypt.compareSync(req.body.repPassword, hashedPass);

            if (equalPass){
                let user = await db.Users.create({
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPass
                })
                res.redirect('/');
            } else {
                return res.render('register', {
                    errors: {
                        repPassword: {
                            msg: "Las contraseñas no coinciden"
                        }
                    }
                })
            }

            if (req.body.password.length < 5){
                return res.render('register', {
                    errors: {
                        password: {
                            msg: "La contraseña debe tener como mínimo 5 caracteres"
                        }
                    }
                })
            }

        } catch(error) {
            res.status(400).json({error: "Ha ocurrido un error inesperado"});
        }
        
    },

    edit: function(req, res){

    },

    delete: async function(req, res){
        try {
            await db.Users.destroy({
                where: {
                    id: req.params.id
                }
            })
            req.session.userLogged = null;
            res.status(200).json({"success": "Usuario eliminado"});
        } catch(error) {
            console.log(error);
            res.status(400).json({"Ocurrió un error": error});
        }
    },

    profile: function(req, res){
        res.render("profile", {
            user: req.session.userLogged
        })
    },

    logout: function(req, res){
        req.session.destroy();
        return res.redirect("/");
    }    
}

module.exports = usersService;