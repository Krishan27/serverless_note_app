'use strict';

const connectToDatabase =requie('./db');
const Note = require('./notes.model.js');
require('dotenv').config({ path: './variables.env' });

module.exports.hello = (event, context, callback) => {
	console.log('Hello World');
	callback(null, 'Hello World');
};

module.exports.create =(event,context,callback) => {

  context.callbackWaitsforEmptyEventLoop =false;


  connectToDatabase().then(() => {
    Note.create(JSON.parse(event.body))
           .then(note => 
             callback(null, {
                statusCode:200,
                body:JSON.stringify(note)
             })
             )
             .catch(err =>
              callback(null, {
                statusCode: err.statusCode || 500,
                headers: { 'Content-Type': 'text/plain'},
                body: 'Could not create the note.'
              })
              );

  });

};

module.exports.getOne =(event,context,callback) => {
  context.callbackWaitsforEmptyEventLoop =false;


  connectToDatabase().then(() => {

    Note.findById(event.pathParameters.id)

          .then(note => 
                 callback(null,{
                   statusCode:200,
                   body:JSON.stringify(note)
                 })
                 )
                 .catch(err =>
                  callback(null,{
                    statusCode: err.statusCode || 500,
                    headers : {'Content-Type': 'text/plain'},
                    body: 'Could not fetch the note'
                  })
                  );
         
  });
};

module.exports.getall =(event,context,callback) => {
  context.callbackWaitsforEmptyEventLoop =false;


  connectToDatabase().then(() => {

    Note.find()

          .then(notes => 
                 callback(null,{
                   statusCode:200,
                   body:JSON.stringify(notes)
                 })
                 )
                 .catch(err =>
                  callback(null,{
                    statusCode: err.statusCode || 500,
                    headers : {'Content-Type': 'text/plain'},
                    body: 'Could not fetch the note'
                  })
                  );
         
  });
};


module.exports.update =(event,context,callback) => {
  context.callbackWaitsforEmptyEventLoop =false;


  connectToDatabase().then(() => {

    Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body),{
      new:true
    })

          .then(note => 
                 callback(null,{
                   statusCode:200,
                   body:JSON.stringify(note)
                 })
                 )
                 .catch(err =>
                  callback(null,{
                    statusCode: err.statusCode || 500,
                    headers : {'Content-Type': 'text/plain'},
                    body: 'Could not fetch the note'
                  })
                  );


                  module.exports.delete = (event, context, callback) => {
                    context.callbackWaitsForEmptyEventLoop = false;
                  
                    connectToDatabase().then(() => {
                      Note.findByIdAndRemove(event.pathParameters.id)
                        .then(note =>
                          callback(null, {
                            statusCode: 200,
                            body: JSON.stringify({
                              message: 'Removed note with id: ' + note._id,
                              note: note
                            })
                          })
                        )
                        .catch(err =>
                          callback(null, {
                            statusCode: err.statusCode || 500,
                            headers: { 'Content-Type': 'text/plain' },
                            body: 'Could not fetch the notes.'
                          })
                        );
                    });
                  };

                });
              };
