import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MdGridListModule } from '@angular/material'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { TileModule } from '../core/components/tile/tile.module'
import { ToolbarModule } from '../core/components/toolbar/toolbar.module'
import { RadarServicesInterceptor } from '../core/services/radar-services.interceptor'
import { SourceGraphsModule } from './components/source-graphs/source-graphs.module'
import { SourceListModule } from './components/source-list/source-list.module'
import { SubjectPageComponent } from './containers/subject-page.component'
import { SensorsDataService } from './services/sensors-data.service'
import { SensorsService } from './services/sensors.service'
import { SourcesService } from './services/sources.service'
import { SensorsDataEffects } from './store/sensors-data/sensors-data.effects'
import { SensorsEffects } from './store/sensors/sensors.effects'
import { SourcesEffects } from './store/sources/sources.effects'
import { routes } from './subject-page.routing'
import { reducers } from './store'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MdGridListModule,
    SourceListModule,
    SourceGraphsModule,
    TileModule,
    ToolbarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('subjectPage', reducers),
    EffectsModule.forFeature([
      SourcesEffects,
      SensorsEffects,
      SensorsDataEffects
    ])
  ],
  declarations: [SubjectPageComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RadarServicesInterceptor,
      multi: true
    },
    SourcesService,
    SensorsService,
    SensorsDataService
  ]
})
export class SubjectPageModule {}
