import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import {Controller} from 'react-hook-form'
import DateObject from 'react-date-object'

import './style.css'

const Date = ({control}:{control: any}) => {
  return (
      <Controller
        control={control}
        name="BirthDate"
        rules={{ required: true }}
        render={({
                   field: { onChange, value },
                 }) => (
          <div className="dateMainContainer">
            <DatePicker
            
              value={value || ""}
              onChange={(date: DateObject) => {
                onChange(date)
              }}
              calendar={persian}
              locale={persian_fa}
              placeholder='تاریخ تولد'
              format="YYYY-MM-DD"
              style={{fontFamily:"vazir-light",direction:'rtl'}}
              containerClassName='dateContainer'
              mapDays={({date}) => {
                let props: any = {}
                if (date.weekDay.index === 6) {
                  props.className = 'highlight highlight-red'
                }
                return props
              }}
            />
          </div>
        )}
      />
  )
}



export default Date