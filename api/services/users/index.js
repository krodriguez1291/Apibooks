const usersArray=[];
const tokenArray=[];

const newUsers = (tweet)=>{
    usersArray.push(tweet); 
}

const newTokens = (token)=>{
    tokenArray.push(token); 
}

const loadUsers = ()=>{
    return usersArray; 
}

const arrayLenght = ()=>{
    return usersArray.length;
}

module.exports = {newUsers,newTokens,loadUsers,arrayLenght};