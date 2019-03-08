var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path=require('path');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname=url.parse(_url,true).pathname;

 

    if(pathname==='/'){
      if(queryData.id===undefined){       
          fs.readdir('./data',function(error,filelist){
             console.log(filelist);
              var title="Welcome";
              var discription="Hello noe.js";   
              var list = template.List(filelist);
              var html=template.HTML(title,list,`<h2>${title}</h2><p>${discription}</p>`,`
              <a href="/create">create</a>`);
              response.writeHead(200);
              response.end(html);
          })        
      } else {
        fs.readdir('./data',function(error,filelist){
          var filteredId=path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`,'utf8',function(err,discription){     
              var title=queryData.id ;
              var list = template.List(filelist);
              var html=template.HTML(title,list,`<h2>${title}</h2><p>${discription}</p>`,
              `<a href="/create">create</a> 
               <a href="/update?id=${title}">update</a>
               <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
               </form>`);
              response.writeHead(200);
              response.end(html);
            });
        });
      }      
    } else if (pathname==='/create'){
      fs.readdir('./data',function(error,filelist){
         var title="WEB-create";
         var list = template.List(filelist);
         var html=template.HTML(title,list,
           `
          <h2>${title}</h2>
          <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" id="" cols="30" rows="10" placeholder="dispcription"></textarea>
          </p>
          <p><input type="submit"></p>
          </form>
          `,'');
         response.writeHead(200);
         response.end(html);
     })
    
    } else if (pathname==='/create_process'){
      var body='';
      request.on('data',function(data){
        body=body+data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var title=post.title;
        var description=post.description;
        //fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
        fs.writeFile(`data/${title}`,description,'utf8',function(err){
          response.writeHead(302,{Location:`/?id=${title}`});
          response.end('sucess');
        });
      });
    } else if(pathname==='/update'){
      fs.readdir('./data',function(error,filelist){
        var filteredId=path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`,'utf8',function(err,description){     
            var title=queryData.id ;
            var list = template.List(filelist);
            var html=template.HTML(title,list,
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" id="" cols="30" rows="10" placeholder="despcription">${description}</textarea>
            </p>
            <p><input type="submit"></p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
            response.writeHead(200);
            response.end(html);
          });
      });

    } else if (pathname==='/update_process'){
      var body='';
      request.on('data',function(data){
        body=body+data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var id=post.id        
        var title=post.title;
        var description=post.description;

        fs.rename(`data/${id}`,`data/${title}`,function(error){
          
          fs.writeFile(`data/${title}`,description,'utf8',function(err){
            response.writeHead(302,{Location:`/?id=${title}`});
            response.end('sucess');
          });

        })
      });

    } else if (pathname==='/delete_process'){
      var body='';
      request.on('data',function(data){
        body=body+data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var id=post.id;
        var filteredId=path.parse(id).base;
        fs.unlink(`data/${filteredId}`,function(error){
          response.writeHead(302,{Location:`/`});
          response.end('sucess');
        });
               
      });

    } else {
        response.writeHead(404);
        response.end('Not found');
    }

});
app.listen(3000);