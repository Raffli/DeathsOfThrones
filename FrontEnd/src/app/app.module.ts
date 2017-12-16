import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ChartModule, TabMenuModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { WikiComponent } from './wiki/wiki.component';
import { StatsComponent } from './stats/stats.component';
import { ContactComponent } from './contact/contact.component';
import {HttpModule} from '@angular/http';
import { TimelineComponent } from './map/timeline/timeline.component';
import {DeathsService} from './services/deaths.service';
import {EpisodesService} from './services/episodes.service';
import { EpisodePopupComponent } from './map/episode-popup/episode-popup.component';
import { DeadPopupComponent } from './map/dead-popup/dead-popup.component';
import {TabViewModule} from 'primeng/primeng';
import {MurderersService} from "./services/murderers.service";
import {LocationsService} from "./services/locations.service";
import { DisplayEntryComponent } from './wiki/display-entry/display-entry.component';
import {ButtonModule} from 'primeng/primeng';
import { YoutubeVideoPlayerComponent } from './youtube-video-player/youtube-video-player.component';
import { WikiDeathsComponent } from './wiki/wiki-deaths/wiki-deaths.component';
import { WikiMurderersComponent } from './wiki/wiki-murderers/wiki-murderers.component';
import { WikiLocationsComponent } from './wiki/wiki-locations/wiki-locations.component';
import { WikiEpisodesComponent } from './wiki/wiki-episodes/wiki-episodes.component';
import {DropdownModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ImpressumComponent } from './impressum/impressum.component';

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
    path: 'impressum',
    component: ImpressumComponent
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
    DisplayEntryComponent,
    YoutubeVideoPlayerComponent,
    WikiDeathsComponent,
    WikiMurderersComponent,
    WikiLocationsComponent,
    WikiEpisodesComponent,
    ImpressumComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), TabMenuModule, HttpModule, TabViewModule, ButtonModule, DropdownModule, FormsModule, BrowserAnimationsModule, ChartModule
  ],
  providers: [DeathsService, EpisodesService, MurderersService, LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
