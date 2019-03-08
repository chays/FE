
var relationship1={
  name:'zero',
  friends:['nero','hero','xero'],
  logFriends:function(){
    var that=this;
    this.friends.forEach(function(friend){
      console.log(that.name, friend);
    });
  }
}
relationship1.logFriends();

relationship2={
  name:'zero',
  friends:['nero','hero','xero'],
  logFriends(){
    this.friends.forEach(friend => {
        console.log(this.name,friend);
    });
  }
}

relationship2.logFriends();


// var candyMachine={
//   status:{
//     name:'node',
//     count:5,
//   },
//   getCandy:function(){
//     this.status.count--;
//     return this.state.count;
//   }
// }

// var getCandy=candyMachine.getCandy;
// var count = candyMachine.status.count;

