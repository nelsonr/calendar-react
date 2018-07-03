var getMonthDays = function (month) {
    var today = new Date();
    var d = new Date(today.getFullYear(), month, 0);

    return d.getDate();
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null
        }
    }

    setStart(day) {
        if (day < this.state.end) {
            this.setState(prevState => ({
                start: day,
                end: prevState.end
            }));
        } else {
            this.setState(_ => ({
                start: day,
                end: null
            }));
        }
    }

    setEnd(day) {
        this.setState(prevState => ({
            start: prevState.start,
            end: day
        }));
    }

    generateDays(days) {
        return {
            start: calendarStartDays,
            end: calendarEndDays
        }
    }
    
    render() {
        let days = Array(getMonthDays(5)).fill().map((_, index) => index + 1);
        
        let calendarStartDays = days.map((day) => {
            let className = "calendar__day";
            
            if (this.state.start) {
                if (day === this.state.start) {
                    className += " calendar--range calendar--start";
                }
            }

            return <div className={className} key={"start-" + day} onClick={_ => this.setStart(day)}>{day}</div>
        });

        let calendarEndDays = days.map((day) => {
            let className = "calendar__day";
            
            if (this.state.start) {
                if (day <= this.state.start) {
                    className += " calendar--disabled";
                }
            } else {
                className += " calendar--disabled";
            }

            if (this.state.start && this.state.end) {
                if (day > this.state.start && day < this.state.end) {
                    className += " calendar--range";
                }

                if (day === this.state.end) {
                    className += " calendar--range calendar--end";
                }
            }

            return <div className={className} key={"end-" + day} onClick={_ => this.setEnd(day)}>{day}</div>
        });
        
        return (
            <div className="calendars">
                <div className="calendar">
                    {calendarStartDays}
                </div>

                <div className="calendar">
                    {calendarEndDays}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Calendar />,
    document.getElementById('app')
);