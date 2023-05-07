
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {AccumulationChartComponent, IAccTextRenderEventArgs, AccumulationChart, GroupModes,IAccPointRenderEventArgs, IAccLoadedEventArgs, AccumulationTheme} from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { RegisterService } from '../../../services/register/register.service';
import { ActivatedRoute } from '@angular/router';



export interface stat {
  y: number,
  text:string
}
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  dataTemp: any;
  id!: number;
  constructor(private registerService: RegisterService, private route: ActivatedRoute) {
    //code
  };
  s: stat;
  stats=[{ x: "hello", y: 17, text: 'Japan: 12' }] ;
  public data: Object[] = this.stats;
  ///{  y: 2, text: 'Australia: 8' },
  //{ y: 19, text: 'Russia: 19' },


  @ViewChild('pie')
  public pie: AccumulationChartComponent | AccumulationChart;
  public onTextRender(args: IAccTextRenderEventArgs): void {
    args.text = args.point.x + ' ' + args.point.y;
  }

  public onPointRender(args: IAccPointRenderEventArgs): void {
    if (args.point.isClubbed || args.point.isSliced) {
      args.fill = '#D3D3D3';
    }
  }

  public radius: string = Browser.isDevice ? '40%' : '70%';
  public explode: boolean = true;
  //Initializing Legend
  public legendSettings: Object = {
    visible: false,
  };
  //Initializing DataLabel
  public dataLabel: Object = {
    visible: true,
    position: 'Outside',
    connectorStyle: { type: 'Curve', length: '20px' },
    font: {
      size: '11px',
      fontWeight: '600'
    }
  };
  public onChange(e: Event): void {
    let element: HTMLInputElement = <HTMLInputElement>e.target;
    let currentValue: number = element.value === 'Point' ? 9 : 8;
    this.pie.series[0].groupMode = <GroupModes>element.value;
    this.pie.series[0].groupTo = currentValue.toString();
    this.pie.series[0].animation.enable = false;
    document.getElementById('clubtext').innerHTML = currentValue.toString();
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public onClubvalue(e: Event): void {
    let clubvalue: string = (document.getElementById('clubvalue') as HTMLSelectElement).value;
    this.pie.series[0].groupTo = clubvalue;
    this.pie.series[0].animation.enable = false;
    document.getElementById('clubtext').innerHTML = clubvalue;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  // custom code start
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
  };
  // custom code end
  public clubvalue: string = '9';
  public startAngle: number = 0;
  public endAngle: number = 360;
  public tooltip: Object = { enable: true, header: '', format: '<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>' };
  public title: string = 'Rio Olympic Gold Medals';
  public groupMode: DropDownList;
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {

      this.id = params.id;
      console.log(this.id)
    });
    this.registerService.countRegisteredUsersForCourse(this.id).subscribe(d => {
      this.dataTemp = d;
      let s = { x:"hello" ,y: this.dataTemp, text: "RegisteredUsersForCourse" };
      console.log(s);
      this.stats.push(s);
    });
    this.registerService.countSucceededUsersInCourse(this.id).subscribe(d => {

      this.dataTemp = d;
      let s = { x: "hello", y: this.dataTemp, text: "RegisteredUsersForCourse" };
      console.log(s);
      this.stats.push(s);
    });
    this.registerService.countFailedUsersInCourse(this.id).subscribe(d => {

      this.dataTemp = d;
      let s = { x: "hello", y: this.dataTemp, text: "RegisteredUsersForCourse" };
      console.log(s);
      this.stats.push(s);
    });


    this.groupMode = new DropDownList({
      index: 0,
      width: 120,
      change: () => {
        let mode: string = this.groupMode.value.toString();
        let currentValue: number = mode === 'Point' ? 9 : 8;
        this.pie.series[0].groupMode = <GroupModes>mode;
        this.pie.series[0].groupTo = currentValue.toString();
        this.pie.series[0].animation.enable = false;
        document.getElementById('clubtext').innerHTML = currentValue.toString();
        (document.getElementById('clubvalue') as HTMLInputElement).value = currentValue.toString();
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
      }
    });
    this.groupMode.appendTo('#mode');
  }

}

