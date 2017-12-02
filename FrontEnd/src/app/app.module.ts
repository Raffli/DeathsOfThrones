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
    path: 'contact',
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
    ContactComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), TabMenuModule, HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
