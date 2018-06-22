import { TimeWindow } from '../enums/time-window.enum'
import {
  MockAPISampleDataset,
  MockChartDataExpected,
  MockChartDataWithStartEndHolesExpected,
  MockTimeFrameChartData,
  MockTimeFrameChartDataWithStartEndHoles
} from '../testing/mocks/mock-chart-data'
import {
  MockAPIComplianceDataset,
  MockComplianceDataExpected,
  MockComplianceDataWithStartEndHolesExpected,
  MockTimeFrameCompliance,
  MockTimeFrameComplianceWithStartEndHoles
} from '../testing/mocks/mock-compliance-data'
import { parseTimeHoles } from './parse-time-holes'

describe('parseTimeHoles', () => {
  it('Sensor Data > 10s Interval > TimeFrame === Data', () => {
    const actual = parseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameChartData,
      TimeWindow.TEN_SECOND
    )
    expect(actual).toEqual(MockChartDataExpected)
  })

  it('Sensor Data > 10s Interval > TimeFrame !== Data', () => {
    const actual = parseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameChartDataWithStartEndHoles,
      TimeWindow.TEN_SECOND
    )
    expect(actual).toEqual(MockChartDataWithStartEndHolesExpected)
  })

  it('Compliance Data > 1d Interval > TimeFrame === Data', () => {
    const actual = parseTimeHoles(
      MockAPIComplianceDataset,
      MockTimeFrameCompliance,
      TimeWindow.ONE_DAY
    )
    expect(actual).toEqual(MockComplianceDataExpected)
  })

  it('Compliance Data > 1d Interval > TimeFrame !== Data', () => {
    const actual = parseTimeHoles(
      MockAPIComplianceDataset,
      MockTimeFrameComplianceWithStartEndHoles,
      TimeWindow.ONE_DAY
    )
    expect(actual).toEqual(MockComplianceDataWithStartEndHolesExpected)
  })
})
