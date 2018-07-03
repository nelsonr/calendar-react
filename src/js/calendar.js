const getMonthDaysCount = function (month) {
    var today = new Date();
    var d = new Date(today.getFullYear(), month + 1, 0);

    return d.getDate();
}

const getMonthDays = function (month) {
    const monthDaysCount = getMonthDaysCount(month);
    const currentYear = (new Date()).getFullYear();

    return Array(monthDaysCount).fill().map((_, index) => 
        new Date(currentYear, month, index + 1)
    );
}

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

class Calendar extends React.Component {    
    render() {
        let prevButtonClass = "calendar__prev";
        let nextButtonClass = "calendar__next";

        if (this.props.showPrevButton === false) {
            prevButtonClass += " hide";
        }

        if (this.props.showNextButton === false) {
            nextButtonClass += " hide";
        }
        
        return (
            <div className="calendar">
                <div className="calendar__header">
                    <div className="calendar__month">{months[this.props.month]}</div>

                    <div className="calendar__nav">
                        <button className={prevButtonClass} onClick={_ => this.props.changeMonth(-1)}>&lt;</button>
                        <button className={nextButtonClass} onClick={_ => this.props.changeMonth(1)}>&gt;</button>
                    </div>
                </div>

                <div className="calendar__days">
                    {this.props.days}
                </div>
            </div>
        );
    }
}

class CalendarDatePicker extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            startDate: null,
            endDate: null,
            startingMonth: (new Date()).getMonth(),
            endingMonth: (new Date()).getMonth() + 1
        }

        this.changeStartingMonth = this.changeStartingMonth.bind(this)
        this.changeEndingMonth = this.changeEndingMonth.bind(this)
    }
    
    setStartDate(day) {
        if (day < this.state.endDate) {
            this.setState({
                startDate: day
            });
        } else {
            this.setState({
                startDate: day,
                endDate: null
            });
        }
    }

    setEndDate(day) {
        this.setState({
            endDate: day
        });
    }

    changeStartingMonth(dir) {
        let newMonth = this.state.startingMonth + dir;

        if (newMonth < 0) {
            newMonth = 0;
        } else if (newMonth > 11) {
            newMonth = 11;
        }
        
        this.setState({
            startingMonth: newMonth
        });
    }

    changeEndingMonth(dir) {
        let newMonth = this.state.endingMonth + dir;

        if (newMonth < 0) {
            newMonth = 0;
        } else if (newMonth > 11) {
            newMonth = 11;
        }
        
        this.setState({
            endingMonth: newMonth
        });
    }   
    
    render() {
        let startingMonthDays = getMonthDays(this.state.startingMonth);
        let endingMonthDays = getMonthDays(this.state.endingMonth);
        let showNav = (this.state.endingMonth - this.state.startingMonth > 1);
        
        let calendarStartDays = startingMonthDays.map((day) => {
            let className = "calendar__day";
            
            if (this.state.startDate) {
                if (day.getTime() === this.state.startDate.getTime()) {
                    className += " calendar--range calendar--start";
                }
            }

            if (this.state.startDate && this.state.endDate) {
                if (day > this.state.startDate && day < this.state.endDate) {
                    className += " calendar--range";
                }
            }

            return <div className={className} key={"start-" + day.getDate()} onClick={_ => this.setStartDate(day)}>{day.getDate()}</div>
        });

        let calendarEndDays = endingMonthDays.map((day) => {
            let className = "calendar__day";
            
            if (this.state.startDate) {
                if (day <= this.state.startDate) {
                    className += " calendar--disabled";
                }
            } else {
                className += " calendar--disabled";
            }

            if (this.state.startDate && this.state.endDate) {
                if (day > this.state.startDate && day < this.state.endDate) {
                    className += " calendar--range";
                }

                if (day.getTime() === this.state.endDate.getTime()) {
                    className += " calendar--range calendar--end";
                }
            }

            return <div className={className} key={"end-" + day.getDate()} onClick={_ => this.setEndDate(day)}>{day.getDate()}</div>
        });
        
        return (
            <div className="calendars">
                <Calendar 
                    days={calendarStartDays} 
                    month={this.state.startingMonth} 
                    changeMonth={this.changeStartingMonth}
                    showPrevButton={true}
                    showNextButton={showNav} />

                <Calendar 
                    days={calendarEndDays} 
                    month={this.state.endingMonth} 
                    changeMonth={this.changeEndingMonth}
                    showPrevButton={showNav}
                    showNextButton={true} />
            </div>
        )
    }
}

ReactDOM.render(
    <CalendarDatePicker />,
    document.getElementById('app')
);