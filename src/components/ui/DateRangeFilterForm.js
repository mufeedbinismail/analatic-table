import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { setDateRange } from '../../actions';
import { getIsoDateString } from '../../utils';


const DateRangeFilterForm = ({dispatch, startDate, endDate}) => {

    const [_startDate, setStartDate] = useState(new Date(startDate));
    const [_endDate, setEndDate] = useState(new Date(endDate));

    const minDate = new Date('2021-06-01');
    const maxDate = new Date('2021-06-31');

    const onSubmit = (ev) => {
      ev.preventDefault();

      const dateRange = {
        startDate: getIsoDateString(_startDate),
        endDate: getIsoDateString(_endDate)
      };

      setDateRange(dispatch)(dateRange);
    }

    const onReset = () => {
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
    }

    return (
      <div className="border p-3 mb-4 rounded">
        <form className="row justify-content-between" onSubmit={onSubmit} onReset={onReset}>
          <div className="col-auto">
            <div className="row">
              <label className="col-auto col-form-label">Select Date Range</label>
              <div className="col-auto">
                <div className="input-group">
                  <DatePicker
                    wrapperClassName="form-control p-0"
                    className="form-control border-0 w-auto"
                    selected={_startDate}
                    onChange={setStartDate}
                    selectsStart
                    startDate={_startDate}
                    endDate={_endDate}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                  <span className="input-group-text">-</span>
                  <DatePicker
                    wrapperClassName="form-control p-0"
                    className="form-control border-0 w-auto"
                    selected={_endDate}
                    onChange={setEndDate}
                    selectsStart
                    startDate={_startDate}
                    endDate={_endDate}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <button type="reset" className="btn btn-secondary mx-2">Reset</button>
            <button type="submit" className="btn btn-primary mx-2">Apply</button>
          </div>
        </form>
      </div>
    );
}

export default DateRangeFilterForm
