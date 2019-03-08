const candyMachine={
  status:{
    name:'node',
    count:5,
  },
  getCandy(){
    this.status.count--;
    return this.status.count;
  }
};
const { getCandy, status:{count}} =candyMachine;

const condition =true;
const promise= new Promise((resolve,reject) => {
  if(condition){
    resolve('성공');
  } else {
    reject('실패');
  }
})
promise
.then((message) =>{
  console.log(message)
})
.catch((error) =>{
  console.log(error)
})



const promise1=Promise.resolve('성공1');
const promise2=Promise.resolve('성공2');

Promise.all([promise1,promise2])
.then((result) =>{
  console.log(result);
})
.catch((error) =>{
  console.log(error);
})


function findAndSaveUser(Users){
  Users.findOne({})
  .then((user)=>{
    user.name='zero';
    return user.save();
  })
  .then((user) => {
    return Users.findOne({gender:'m'}0);
  })
  .then((user) =>{

  })
  .catch(err =>{
    console.log(error)
  })
}

async function findAndSaveUser(Users){
  try{
  let user=await Users.findOne({});
  user.name='zero';
  user=await user.save();
  user=await Users.findOne({gender:'m'})
  } catch(error) {
    console.log(error);
  }
}

const findAndSaveUser = async(Users) =>{
  try {

  } catch {

  }
}