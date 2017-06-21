import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as sourceAction from './source.actions'
import { Source } from './source.model'
import { SourceService } from './source.service'

@Injectable()
export class SourceEffects {

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(sourceAction.GET_ALL)
    .map(toPayload)
    .switchMap(payload => {
      return this.sourceService.getAll(payload)
        .map((data: Source[]) => new sourceAction.GetAllSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private sourceService: SourceService
  ) {}
}
