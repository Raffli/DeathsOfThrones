import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {TabMenuModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { WikiComponent } from './wiki/wiki.component';
import { StatsComponent } from './stats/stats.component';
import { ContactComponent } from './contact/contact.component';
import {DataService} from './services/data-service.service';
import {HttpModule} from '@angular/http';
import { TimelineComponent } from './map/timeline/timeline.component';
import {DeathsService} from './services/deaths.service';
import {EpisodesService} from './services/episodes.service';
import { EpisodePopupComponent } from './map/episode-popup/episode-popup.component';
import { DeadPopupComponent } from './map/dead-popup/dead-popup.component';
import {TabViewModule} from 'primeng/primeng';
import {MurderersService} from "./services/murderers.service";
import {LocationsService} from "./services/locations.service";
import { DisplayDeathComponent } from './wiki/display-death/display-death.component';

const appRoutes :Routes = [
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'wiki',
    component: WikiComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'about',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: '/map'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    WikiComponent,
    StatsComponent,
    ContactComponent,
    TimelineComponent,
    EpisodePopupComponent,
    DeadPopupComponent,
    DisplayDeathComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), TabMenuModule, HttpModule, TabViewModule
  ],
  providers: [DataService, DeathsService, EpisodesService, MurderersService, LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
