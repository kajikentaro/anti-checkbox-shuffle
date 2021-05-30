'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'write') {
    chrome.storage.sync.set({'data': output()}, () => {
    });
    sendResponse();
  }
  if (request.type == 'read') {
    chrome.storage.sync.get(['data'], result => {
      console.log(result.data);
      input(result.data);
    });
    sendResponse();
  }
  sendResponse({});
  return true;
});
function output(){
    let inputs = document.getElementsByTagName("input");
    let checked = [];
    for(let input of inputs){
        if(input.type != "radio")continue;
        if(input.checked)checked.push({name: input.name, value: input.value});
    }
    console.log(JSON.stringify(checked))
    return JSON.stringify(checked);
}
function input(str){
    let data = JSON.parse(str);
    let inputs = document.getElementsByTagName("input");
    for(let input of inputs){
        if(input.type != "radio")continue;
        for(let d of data){
            if(input.name == d.name && input.value == d.value){
                input.checked = true;
            }
        }
    }
}