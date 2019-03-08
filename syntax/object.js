
//array
var members=['egoing','k885','hoya'];


var i=0;
while(i<members.length){
  console.log('array loop', members[i]);
  i++;
}



//object
var roles={
  'programer':'egoing',
  'designer':'k88905',
  'manager':'hoya'
}

for(var name in roles){
  console.log('object=>', name, 'value=>',roles[name]);
}
