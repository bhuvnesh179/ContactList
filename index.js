const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// setup a middleware
app.use(express.urlencoded());
app.use(express.static('assets'));  
// middleware 1
// app.use(function(req, res, next){
//     // console.log('middleware 1 called');
//     req.myName = "Bansal";
//     next();
// });
// middleware 2
// app.use(function(req, res, next){
//     // console.log('middleware 2 called');
//     console.log('name from mw2', req.myName);
//     next();
// });
var contactList = [
    {
        name: "Bhuvnesh",
        phone: "8209944142"
    },
    {
        name: "Nikita",
        phone: "8619442733"
    }
]

app.get('/', function(req, res){
    // console.log(__dirname);
    // res.send('<h1>Cool, it is running! or is it?</h1>');
    // console.log(req.myName);

    // Revision
    Contact.find({})
    .then(contacts => {
        return res.render('home', {
            title: "My Contact List",
            contact_list: contacts
        }); 
    })
    .catch(err => {
        console.log('Error in fetching contacts from db');
        return;
    });


    // return res.render('home', {
    //     title: "My Contact List",
    //     contact_list: contactList
    // }); 
});
app.get('/practice', function(req, res){
    return res.render('practice', {title: "Let play with ejs"});
});


app.post('/create-contact', function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // 2nd method
    // contactList.push(req.body); 
    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }, function(err, newContact){
    //     if(err){console.log('error in creating a contact!');
    //     return;}

    //     console.log('**********', newContact);
    //     return res.redirect('back');
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then(newContact => {
        console.log('**********', newContact);
        return res.redirect('back');
    })
    .catch(err => {
        console.error('error in creating a contact!');
        return;
    });
    // return res.redirect('/');
    // 2nd method
    // when you want to back and url is big then you can you "back"
    // return res.redirect('back');
});
// when we enter url this then this will happend.
// app.get('/profile', function(req, res){
//     res.send('<h1>Cool, it is running! or is it?</h1>');
// });

app.get('/delete-contact', function(req, res){
    // console.log(req.query);
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');
    let id = req.query.id;
    Contact.findByIdAndDelete(id)
    .catch(err => {
        console.log('error in deleting an object from database');
        return;
    })
    return res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log('Server is up and running on Port', port);
});