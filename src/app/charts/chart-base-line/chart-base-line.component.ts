import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as d3 from 'd3'
import { lineChunked } from 'd3-line-chunked'

import { ChartData } from '../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-line',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseLineComponent extends ChartBaseComponent {
  @Input() hasGradient = false
  @Input() hasTimeHoles = true
  @Input()
  gradientColors = [
    { offset: '0%', color: '#2ED8E5' },
    { offset: '50%', color: '#F8E81C' },
    { offset: '100%', color: '#FF9100' }
  ]
  @Input()
  gradientStops = {
    y1: 60,
    y2: 120
  }

  data: ChartData[]
  line: any
  lineGroup: any
  gradient: any
  lineChunked: any
  extentFactor = 1.5

  init() {
    // Add HR Gradient
    if (this.hasGradient) {
      this.chart.classed('hr-gradient', true)

      this.gradient = this.svg.append('linearGradient')
      this.gradient
        .attr('id', 'hr-gradient-' + this.uid)
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

    this.lineChunked = lineChunked()
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.value))
      .curve(d3.curveMonotoneX)
      .defined(d => d.value)
      .pointAttrs({ r: 1.5 })

    super.init()
  }

  draw() {
    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain(this.getDomain(d3.extent(this.data, d => d.value as number)))
      .nice()

    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, d => d.date))
      .nice()

    this.hasXAxis && this.xAxis.call(d3.axisBottom(this.xScale))
    this.hasYAxis &&
      this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    this.lineGroup.selectAll('.line').remove()

    const lines = this.lineGroup
      .datum(this.data)
      .call(this.lineChunked)
      .attr('class', 'line')

    // Add HR Gradient
    if (this.hasGradient) {
      this.gradient
        .attr('y1', this.yScale(this.gradientStops.y1))
        .attr('y2', this.yScale(this.gradientStops.y2))
    }

    lines
      .selectAll('circle')
      .attr(
        'fill',
        this.hasGradient ? `url(#hr-gradient-${this.uid})` : this.color
      )

    lines
      .selectAll('path')
      .attr(
        'stroke',
        this.hasGradient ? `url(#hr-gradient-${this.uid})` : this.color
      )
      .attr('opacity', 0)
      .transition()
      .attr('opacity', 1)
      .duration(500)
  }

  private getDomain(extent) {
    return extent[0] === extent[1]
      ? [extent[0] / this.extentFactor, extent[0] * this.extentFactor]
      : extent
  }
}
