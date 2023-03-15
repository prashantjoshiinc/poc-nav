import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-poll',
  templateUrl:'./poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {
  title: string;

  constructor() { 
    
  }

  ngOnInit(): void {
    if (!document.getElementById('importednative-shim')) {
      this.importJS('native-shim');
      this.importJS('framework-poll');

      const myAngularElement = document.getElementById('mycontainer');
      const el = document.createElement('framework-poll');
      el['userDetail'] = this.title;
      myAngularElement.appendChild(el); //connectedCallback runs here
    }

    

    fromEvent(window, 'event').subscribe((event)=>{
      this.title = `Current logged in User is ${event['detail']}`;
      const myAngularElement = document.getElementById('mycontainer');
      //myAngularElement.setAttribute('user-detail',this.title)
      //  myAngularElement['userDetail'] = 'John';
      //  document.getElementById('my-container').appendChild(myAngularElement);
      const nodes = myAngularElement.childNodes;
      
      if(nodes.length > 0)
         myAngularElement.removeChild(nodes[0]);

      const el = document.createElement('framework-poll');
      el['userDetail'] = this.title;
      myAngularElement.appendChild(el); //connectedCallback runs here


      
    })
  }

 
  ngOnDestroy(): void {
    this.remoteJS('native-shim');
    this.remoteJS('framework-poll');
  }

  importJS(name) {
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.id = 'imported' + name;
    script.src = 'assets/js/' + name + '.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  remoteJS(name) {
    document.getElementById('imported' + name).remove();
  }

}
