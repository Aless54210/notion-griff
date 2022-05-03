const db = require("../models");
const tokenController = require("./token.controller");
const Users = db.users;
const Tokens = db.tokens;
const Notes = db.notes;

/* 
** Check user function
** Verify the cookie accessToken and verify that it exist on database
** Return the user with this token
*/
exports.checkUser = async (req,res) => {
    const head = req.get('Authorization')
    resData = {
        user: null,
        res: res
    }
    if(!head) {
        resData.res.status(401).json({
            message: "No 'Authorization' field in request header",
            success: false
        });
        return resData;
    }
    const apiKey = head.replace('Bearer','').trim();
    let token = await Tokens.findOne({where: {accessToken: apiKey}});
    if(!token) {
        resData.res.status(401).json({
            message: "Bad token!",
            success: false
        });
        return resData;
    }
    resData.user = await Users.findOne({where: {tokensId: token.id}});
    return resData;
}
/*
** Create note function
** params body: title, description, assigneesId, priority
** response: success and/or message
*/
exports.createNote = async (req,res) => {
    const {user,resData} = await this.checkUser(req,res);
    if(!user)
        return resData
    if(!req.body.title || !req.body.description || !req.body.priority) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        });
        return res;
    }

    const note = {
        userId: user.id,
        title: req.body.title,
        description: req.body.description,
        assigneesId: req.body.assigneesId,
        priority: req.body.priority
    };
    await Notes.create(note).then(async (objNote) => {
        objNote.tokensId = await tokenController.createToken(objNote);
        await objNote.save();
        res.status(200).json({
            success: true
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the user.",
            success: false
        });
        return res;
    });
    return res;
};
/*
** Update note function
** params body: title, description, assigneesId, priority
** response: success and/or message
*/
exports.updateNote = async (req,res) => {
    const {user,resData} = await this.checkUser(req,res);
    if(!user)
        return resData;
    if(!req.body.title && !req.body.description && !req.body.assigneesId && !req.body.priority) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        });
        return res;
    }
    try {
        const note = await Notes.findOne({where: {id: req.body.id,userId: user.id}})
        if(note) {
            if(note.title != req.body.title) note.title = req.body.title;
            if(note.description != req.body.description) note.description = req.body.description;
            if(note.assigneesId != req.body.assigneesId) note.assigneesId = req.body.assigneesId;
            if(note.priority != req.body.priority) note.priority = req.body.priority;

            await note.save();
            res.status(200).json({
                success: true
            });
        } else {
            res.status(401).json({
                message: "Email or password is not correct !",
                success: false
            });
        }
    } catch(error) {
        console.error(error);
        res.status(503).json({
            message: "Server error",
            success: false
        });
        return res;
    }
    return res;
};
/*
** Get Notes function
*/
exports.getNotes = async (req,res) => {
    const notes = await Notes.findAll();
    res.status(200).json({
        data: notes,
        success: true
    });
    return res;
};
/*
** Get one note
** params url: noteId
** response: note obj
*/
exports.getNoteId = async (req,res) => {
    if(!req.params['noteId']) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        });
        return res;
    }
    const note = await Notes.findOne({where: {id: req.params['noteId']}});
    if(!note) {
        res.status(401).json({
            message: "Note doesn't exist !",
            success: false
        });
    } else {
        res.status(200).json({
            data: note,
            success: true
        });
    }
    return res;
};

/*
** Delete one note
** params url: noteId
** response: success and/or message
*/
exports.deleteNote = async (req,res) => {
    const {user,resData} = await this.checkUser(req,res);
    if(!user)
        return resData;
    if(!req.params['noteId']) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        });
        return res;
    }
    const note = await Notes.findOne({where: {id: req.params['noteId']}});
    if(!note) {
        res.status(401).json({
            message: "Note doesn't exist !",
            success: false
        });
    } else {
        if(note.userId != user.id) {
            res.status(401).json({
                message: "You must be the note creator to remove !",
                success: false
            });
        } else {
            await note.destroy();
            res.status(200).json({
                success: true
            });
        }
    }
    return res;
};