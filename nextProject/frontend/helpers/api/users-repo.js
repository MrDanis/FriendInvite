import * as fs from 'fs';
// const fs = require('fs');

// users in JSON file for simplicity, store in a db for production applications
let users = require('data/users.json');

export const usersRepo = {
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    create,
    update,
    delete: _delete
};

function create(user) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

async function update(username, params) {
    alert('called to update the user');
    console.log(username)
    console.log(params)
    let currentUser = users.filter((user)=> user.email===username.email);
    let userObj =  currentUser[0];
    let userpayload ={
        ...userObj,
        league_id:params?.id,
        league_name:params?.name
    }
    users[users.length-1] = userpayload;
    let data = JSON.stringify(users,null,2);
    console.log('Updated user is : ',users[users.length-1]);
    try {
        fs.writeFileSync('data/users.json', data);
        console.log('Data written to file successfully');
      } catch (error) {
        console.error('Error writing data to file:', error);
      }
    // await fs?.writeFileSync('data/users.json',data,doneWriting)
    // const user = users.find(x => x.username.toString() === username.toString());

    // // set date updated
    // user.dateUpdated = new Date().toISOString();

    // // update and save
    // Object.assign(user, params);
    // saveData();
}
const doneWriting = (err)=>{
    if(err){
        alert('Error in updating the file....');
    }
    else{
        alert('data is saved in the file');
    }
}
// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted user and save
    users = users.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}