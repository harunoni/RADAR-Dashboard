import { Component, Input } from '@angular/core'
import * as d3 from 'd3'
import { lineChunked } from 'd3-line-chunked'

import { ChartData } from '../../../shared/models/chart-data.model'
import { AppConfig } from '../../../shared/utils/config'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-line',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-line.component.scss']
})
export class ChartBaseLineComponent extends ChartBaseComponent {
  @Input() gradientEnabled = false
  @Input() gradientColors = AppConfig.charts.GRADIENT_COLORS
  @Input() gradientStops = AppConfig.charts.GRADIENT_STOPS

  data: any
  svg: any
  chart: any
  width: number
  height: number
  xAxis: any
  yAxis: any
  xScale: any
  yScale: any
  line: any
  lineGroup: any
  gradient: any
  lineChunked: any

  init() {
    // Add HR Gradient
    if (this.gradientEnabled) {
      this.chart.classed('hr-gradient', true)

      this.gradient = this.svg.append('linearGradient')
      // FIXME: .attr('id', 'hr-gradient') needs to be dynamic for multiple charts
      this.gradient
        .attr('id', 'hr-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('x2', 0)
        .selectAll('stop')
        .data(this.gradientColors)
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color)
    }

    this.lineGroup = this.chart.append('g')

    // TODO: Add this as an option for x and y (hasXAxis)
    this.xAxis.remove()

    this.lineChunked = lineChunked()
      .x((d: ChartData) => this.xScale(d.date))
      .y((d: ChartData) => this.yScale(d.value))
      .curve(d3.curveLinear)
      .defined((d: ChartData) => d.value)

    super.init()
  }

  draw() {
    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d: ChartData) => d.date))

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain(d3.extent(this.data, (d: ChartData) => d.value as number))

    this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    // Add HR Gradient
    if (this.gradientEnabled) {
      this.gradient
        .attr('y1', this.yScale(this.gradientStops.y1))
        .attr('y2', this.yScale(this.gradientStops.y2))
    }

    this.lineGroup.selectAll('.line').remove()

    this.lineGroup
      .datum(this.data)
      .call(this.lineChunked)
      .attr('class', 'line')
  }
}
