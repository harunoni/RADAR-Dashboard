import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-date-axis',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-date-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartDateAxisComponent extends ChartBaseComponent {
  @Input() timeFrame

  init() {
    if (this.timeFrame) {
      this.data = [
        new Date(this.timeFrame.startDateTime),
        new Date(this.timeFrame.endDateTime)
      ]
    }

    super.init()
  }

  draw() {
    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain([
        new Date(this.timeFrame.startDateTime),
        new Date(this.timeFrame.endDateTime)
      ])
      // .domain(d3.extent(this.data))
      .nice()

    this.xAxis.call(d3.axisBottom(this.xScale))
  }
}
