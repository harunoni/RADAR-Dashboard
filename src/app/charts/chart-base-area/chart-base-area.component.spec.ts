import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../../assets/testing/mocks/mock-chart-data'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import { ChartBaseAreaComponent } from './chart-base-area.component'

describe('ChartBaseAreaComponent', () => {
  let component: ChartBaseAreaComponent
  let fixture: ComponentFixture<ChartBaseAreaComponent>
  let element: HTMLElement

  const mockChartData = parseTimeHoles(
    MockAPISampleDataset,
    MockTimeFrameChartData,
    MockTimeIntervalChartData
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseAreaComponent]
    })

    fixture = TestBed.createComponent(ChartBaseAreaComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should NOT update() and change size before data changes', () => {
    fixture.detectChanges()

    expect(component.width).toBeFalsy()
    expect(component.height).toBeFalsy()
    expect(component.chartData).toBeFalsy()
  })

  it('should NOT have area property before data changes', () => {
    fixture.detectChanges()

    expect(element.querySelector('g.chart .area')).toBeFalsy()
  })

  it('should update() and change size if data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(component.width).toBeGreaterThan(0)
    expect(component.height).toBeGreaterThan(0)
  })

  it('area should have attribute d when data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(element.querySelector('g.chart .area')).toBeTruthy()
    expect(
      element.querySelector('g.chart .area').getAttribute('d')
    ).toBeTruthy()
  })
})
