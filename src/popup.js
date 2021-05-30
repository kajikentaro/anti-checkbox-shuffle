'use strict';
import './popup.css';
(function() {
  document.getElementById("writeBtn").onclick = ()=>{
    if(confirm("保存しますか？")){
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'write',
          },
          response => {
            console.log('書き込み完了');
          }
        );
      });
    }
  }
  document.getElementById("readBtn").onclick = ()=>{
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'read',
        },
        response => {
          console.log('読み込み完了');
        }
      );
    });
  }
})();