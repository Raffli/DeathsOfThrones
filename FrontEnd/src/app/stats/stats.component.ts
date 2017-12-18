import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {DeathsService} from '../services/deaths.service';
import {EpisodesService} from '../services/episodes.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private options = {
    animation: {
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font='24px Arial';
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    }
  };
  private pieOptions = {
    animation: {
      duration: 500,
      easing: "easeOutQuart",
      onComplete: function () {
        var ctx = this.chart.ctx;
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset) {

          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle)/2;

            var x = mid_radius * Math.cos(mid_angle);
            var y = mid_radius * Math.sin(mid_angle);

            ctx.fillStyle = '#fff';
            ctx.fillText(dataset.data[i], model.x + x, model.y + y);
          }
        });
      }
    }
  };
  private barData: any;
  private pieData: any;
  private lineData: any;
  private currentLabel: string;
  private currentLabels: any[];
  private currentBackgroundColors: any[];
  private currentData: any[];
  private datasets : SelectItem[];
  private selectedDataset: string;
  private datasetSelected: boolean;
  private barChartSelected: boolean;
  private pieChartSelected: boolean;
  private lineChartSelected: boolean;

  private bgColorDefault: string;
  private bgColorSelected: string;
  private bgColorBar: string;
  private bgColorPie: string;
  private bgColorLine: string;

  private fontColorDefault: string;
  private fontColorSelected: string;
  private fontColorBar: string;
  private fontColorPie: string;
  private fontColorLine: string;

  constructor(private deathsService: DeathsService, private episodesService: EpisodesService) { }

  ngOnInit() {
    this.datasets = [
      {label: 'Deaths by Season', value: 'Deaths By Season'},
      {label: 'Average Viewer per Season', value: 'Average Viewer per Season'},
    ];
    this.selectedDataset = 'Select a dataset';
    this.bgColorDefault = '#15191a';
    this.bgColorSelected = '#969070';
    this.bgColorBar = this.bgColorSelected;
    this.bgColorPie = this.bgColorLine = this.bgColorDefault;
    this.fontColorDefault = '#969070';
    this.fontColorSelected = '#15191a';
    this.fontColorBar = this.fontColorSelected;
    this.fontColorPie = this.fontColorLine = this.fontColorDefault;
    this.barChartSelected = true;
    this.pieChartSelected = this.lineChartSelected = false;
  }

  selectBar = function () {
    this.bgColorBar = this.bgColorSelected;
    this.bgColorPie = this.bgColorLine = this.bgColorDefault;
    this.fontColorBar = this.fontColorSelected;
    this.fontColorPie = this.fontColorLine = this.fontColorDefault;
    this.barChartSelected = true;
    this.pieChartSelected = this.lineChartSelected = false;
  };

  selectPie = function () {
    this.bgColorPie = this.bgColorSelected;
    this.bgColorBar = this.bgColorLine = this.bgColorDefault;
    this.fontColorPie = this.fontColorSelected;
    this.fontColorBar = this.fontColorLine = this.fontColorDefault;
    this.pieChartSelected = true;
    this.barChartSelected = this.lineChartSelected = false;
  };

  selectLine = function () {
    this.bgColorLine = this.bgColorSelected;
    this.bgColorBar = this.bgColorPie = this.bgColorDefault;
    this.fontColorLine = this.fontColorSelected;
    this.fontColorBar = this.fontColorPie = this.fontColorDefault;
    this.lineChartSelected = true;
    this.pieChartSelected = this.barChartSelected = false;
  };

  setData = function () {
    this.barData = {
      labels: this.currentLabels,
      datasets: [
        {
          label: this.currentLabel,
          backgroundColor: '#969070',
          borderColor: '#969070',
          data: this.currentData
        }
      ]
    };
    this.pieData = {
      labels: this.currentLabels,
      datasets: [
        {
          data: this.currentData,
          backgroundColor: this.currentBackgroundColors,
          hoverBackgroundColor: this.currentBackgroundColors
        },
      ]
    };
    this.lineData = {
      labels: this.currentLabels,
      datasets: [
        {
          label: this.currentLabel,
          data: this.currentData,
          fill: false,
          borderColor: '#969070'
        }
      ]
    };

    this.datasetSelected = true;
  };

  onDatasetSelect = function (event) {
    console.log(event);
    if (event.value == 'Deaths By Season') {
      this.deathsService.getDeathsBySeason()
        .subscribe( (data: any) => {
          this.currentData = data;
          this.currentLabels = ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6'];
          this.currentLabel = 'Deaths';
          this.currentBackgroundColors = ['#728591', '#40637C', '#007F46', '#6F9142', '#CC8E0A', '#7F0000'];
          this.setData();
        });
    } else if (event.value == 'Average Viewer per Season') {
      this.episodesService.getAvgViewerPerSeason()
        .subscribe((data: any) => {
          this.currentData = data;
          for (let i = 0; i < this.currentData.length; i++) {
            this.currentData[i] /= 1000000;
          }
          this.currentLabels = ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6'];
          this.currentLabel = 'Viewers in Millions';
          this.currentBackgroundColors = ['#728591', '#40637C', '#007F46', '#6F9142', '#CC8E0A', '#7F0000'];
          this.setData();
        });
    }
  };

}
