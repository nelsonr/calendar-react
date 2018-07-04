const getMonthDaysCount = function (month) {
    var today = new Date();
    var d = new Date(today.getFullYear(), month + 1, 0);

    return d.getDate();
}

const getMonthDays = function (date) {
    const year = date.getFullYear();
    const month = date.getMonth()
    const monthDaysCount = getMonthDaysCount(month);

    return Array(monthDaysCount).fill().map((_, index) =>
        new Date(year, month, index + 1)
    );
}

var months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

class DateDisplay extends React.Component {
    dateToString(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (day < 10) {
            day = "0" + day;
        }

        if (month < 10) {
            month = "0" + month;
        }

        return `${day}/${month}/${date.getFullYear()}`;
    }

    render () {
        let startDate = "";
        let endDate = "";
        let clearBtnClass = "date-display__clear";

        if (this.props.startDate) {
            startDate = this.dateToString(this.props.startDate);
        }

        if (this.props.endDate) {
            endDate = this.dateToString(this.props.endDate);
        }

        if (this.props.startDate === null && this.props.endDate === null) {
            clearBtnClass += " hide";
        }

        return (
            <div className="date-display">
                <div className="date-display__content">
                    <span>{startDate}</span> - <span>{endDate}</span>
                </div>
                <div className={clearBtnClass} onClick={this.props.clearSelection}>Clear</div>
            </div>
        )
    }
}

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
                    <div className="calendar__month">{months[this.props.month.getMonth()] + " " + this.props.month.getFullYear()}</div>

                    <div className="calendar__nav">
                        <button className={prevButtonClass} onClick={_ => this.props.changeMonth(-1)}>&lt;</button>
                        <button className={nextButtonClass} onClick={_ => this.props.changeMonth(1)}>&gt;</button>
                    </div>
                </div>

                <div className="calendar__week-days">
                    <div>S</div>
                    <div>T</div>
                    <div>Q</div>
                    <div>Q</div>
                    <div>S</div>
                    <div>S</div>
                    <div>D</div>
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

        let startingMonth = new Date();
        startingMonth.setDate(1);

        let endingMonth = new Date(
            startingMonth.getFullYear(),
            startingMonth.getMonth() + 1
        );

        this.state = {
            startDate: null,
            endDate: null,
            startingMonth: startingMonth,
            endingMonth: endingMonth
        }

        this.changeStartingMonth = this.changeStartingMonth.bind(this)
        this.changeEndingMonth = this.changeEndingMonth.bind(this)
        this.clearSelection = this.clearSelection.bind(this)
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
        this.setState({
            startingMonth: new Date(
                this.state.startingMonth.getFullYear(),
                this.state.startingMonth.getMonth() + dir,
                1
            )
        });
    }

    changeEndingMonth(dir) {
        this.setState({
            endingMonth: new Date(
                this.state.endingMonth.getFullYear(),
                this.state.endingMonth.getMonth() + dir,
                1
            )
        });
    }

    clearSelection() {
        this.setState({
            startDate: null,
            endDate: null
        })
    }

    showNav() {
        let startingMonth = this.state.startingMonth.getMonth();
        let startingYear = this.state.startingMonth.getFullYear();
        let endingMonth = this.state.endingMonth.getMonth();
        let endingYear = this.state.endingMonth.getFullYear();

        if (endingYear > startingYear) {
            return true;
        }

        return endingMonth - startingMonth > 0;
    }

    render() {
        let startingMonthDays = getMonthDays(this.state.startingMonth);
        let endingMonthDays = getMonthDays(this.state.endingMonth);
        let showNav = this.showNav();

        let calendarStartDays = startingMonthDays.map((day) => {
            let className = "calendar__day";

            if (day.getDate() === 1) {
                className += " calendar__day--offset-" + (day.getDay() || 7);
            }

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

            if (day.getDate() === 1) {
                className += " calendar__day--offset-" + (day.getDay() || 7);
            }

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
            <div className="date-picker">
                <DateDisplay
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    clearSelection={this.clearSelection} />

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
            </div>
        )
    }
}

ReactDOM.render(
    <CalendarDatePicker />,
    document.getElementById('app')
);