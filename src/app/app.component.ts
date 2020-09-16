import { Component } from '@angular/core';
import {GetDataService} from './get-data.service';
declare function plusSlides(n);
declare function SliderArrowClicked(direction,id,e);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
metaData:Array<any>;
series=[];
films=[];
documentaries=[];

  title = 'assignment-for-media-choice';
  constructor(private getDataService:GetDataService){}
  ngOnInit(){
    this.getDataService.getOttxperiencedata().subscribe(res =>{
      this.metaData=res['MetaData'];
      this.metaData.forEach(element => {
        switch (element.ContentType) {
          case 'Serie':this.series.push({
            "type":'Series',
           "Title":element.Title,
           "poster":element.LargeVisual
          });
            
            break;
            case 'Film':this.films.push({
              "type":'Film',
             "Title":element.Title,
             "poster":element.LargeVisual
            });
              
              break;
              case 'Documentary':this.documentaries.push({
                "type":'Documentary',
               "Title":element.Title,
               "poster":element.LargeVisual
              });
                
                break;
        
          default:
            break;
        }
        
      });
      console.log(res['MetaData'][0].ContentType);
    });
    this.loadScript("../assets/js/home.js");
   
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  moveSlides(n){
    plusSlides(n);
  }
  SliderArrowClicked(direction,id,e){
    SliderArrowClicked(direction,id,e);
  }
}
