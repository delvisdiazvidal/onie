import { Component, OnInit } from '@angular/core';
import { DocsDir } from 'src/app/shared/models/docs.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ui-laws-and-docs',
  templateUrl: './laws-and-docs.component.html',
  styleUrls: ['./laws-and-docs.component.css']
})
export class LawsAndDocsComponent implements OnInit {

  docUrl: string;

  constructor() {
    this.docUrl = environment.docsUrl + DocsDir.oficialRoot;
   }

  ngOnInit(): void {
  }

  getUrl(dir: string){
    return this.docUrl + dir;
  }

  getLaw202011Doc(){
    return this.docUrl + DocsDir.law202011Doc;
  }

  getRes202018Doc(){
    return this.docUrl + DocsDir.res202018Doc;
  }

  getRes2020132Doc(){
    return this.docUrl + DocsDir.res2020132Doc;
  }

  getViolationsDoc(){
    return this.docUrl + DocsDir.violationsDoc;
  }

  getHelpDoc(){
    return this.docUrl + DocsDir.helpDoc;
  }

  getAPDoc(){
    return this.docUrl + DocsDir.apDoc;
  }

  getASDoc(){
    return this.docUrl + DocsDir.asDoc;
  }

  getPPDoc(){
    return this.docUrl + DocsDir.ppDoc;
  }

  getPSDoc(){
    return this.docUrl + DocsDir.psDoc;
  }

}
