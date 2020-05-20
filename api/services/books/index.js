const booksArray=[];

const newBooks = (tweet)=>{
    booksArray.push(tweet); 
}

const loadBooks = ()=>{
    return booksArray; 
}

const arrayLenght = ()=>{
    return booksArray.length;
}

module.exports = {newBooks,loadBooks,arrayLenght};