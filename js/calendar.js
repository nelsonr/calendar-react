var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getMonthDaysCount = function getMonthDaysCount(month) {
    var today = new Date();
    var d = new Date(today.getFullYear(), month + 1, 0);

    return d.getDate();
};

var getMonthDays = function getMonthDays(month) {
    var monthDaysCount = getMonthDaysCount(month);
    var currentYear = new Date().getFullYear();

    return Array(monthDaysCount).fill().map(function (_, index) {
        return new Date(currentYear, month, index + 1);
    });
};

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar() {
        _classCallCheck(this, Calendar);

        return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
    }

    _createClass(Calendar, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "calendar" },
                React.createElement(
                    "div",
                    { className: "calendar__header" },
                    React.createElement(
                        "div",
                        { className: "calendar__month" },
                        months[this.props.month]
                    ),
                    React.createElement(
                        "div",
                        { className: "calendar__nav" },
                        React.createElement(
                            "button",
                            { className: "calendar__prev", onClick: function onClick(_) {
                                    return _this2.props.changeMonth(-1);
                                } },
                            "<"
                        ),
                        React.createElement(
                            "button",
                            { className: "calendar__next", onClick: function onClick(_) {
                                    return _this2.props.changeMonth(1);
                                } },
                            ">"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "calendar__days" },
                    this.props.days
                )
            );
        }
    }]);

    return Calendar;
}(React.Component);

var CalendarDatePicker = function (_React$Component2) {
    _inherits(CalendarDatePicker, _React$Component2);

    function CalendarDatePicker(props) {
        _classCallCheck(this, CalendarDatePicker);

        var _this3 = _possibleConstructorReturn(this, (CalendarDatePicker.__proto__ || Object.getPrototypeOf(CalendarDatePicker)).call(this, props));

        _this3.state = {
            startDate: null,
            endDate: null,
            startingMonth: new Date().getMonth(),
            endingMonth: new Date().getMonth() + 1
        };

        _this3.changeStartingMonth = _this3.changeStartingMonth.bind(_this3);
        _this3.changeEndingMonth = _this3.changeEndingMonth.bind(_this3);
        return _this3;
    }

    _createClass(CalendarDatePicker, [{
        key: "setStart",
        value: function setStart(day) {
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
    }, {
        key: "setEnd",
        value: function setEnd(day) {
            this.setState({
                endDate: day
            });
        }
    }, {
        key: "changeStartingMonth",
        value: function changeStartingMonth(dir) {
            var newMonth = this.state.startingMonth + dir;

            if (newMonth < 0) {
                newMonth = 11;
            } else if (newMonth > 11) {
                newMonth = 0;
            }

            this.setState({
                startingMonth: newMonth
            });
        }
    }, {
        key: "changeEndingMonth",
        value: function changeEndingMonth(dir) {
            var newMonth = this.state.endingMonth + dir;

            if (newMonth < 0) {
                newMonth = 11;
            } else if (newMonth > 11) {
                newMonth = 0;
            }

            this.setState({
                endingMonth: newMonth
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var startingMonthDays = getMonthDays(this.state.startingMonth);
            var endingMonthDays = getMonthDays(this.state.endingMonth);

            var calendarStartDays = startingMonthDays.map(function (day) {
                var className = "calendar__day";

                if (_this4.state.startDate) {
                    if (day.getTime() === _this4.state.startDate.getTime()) {
                        className += " calendar--range calendar--start";
                    }
                }

                if (_this4.state.startDate && _this4.state.endDate) {
                    if (day > _this4.state.startDate && day < _this4.state.endDate) {
                        className += " calendar--range";
                    }
                }

                return React.createElement(
                    "div",
                    { className: className, key: "start-" + day.getDate(), onClick: function onClick(_) {
                            return _this4.setStart(day);
                        } },
                    day.getDate()
                );
            });

            var calendarEndDays = endingMonthDays.map(function (day) {
                var className = "calendar__day";

                if (_this4.state.startDate) {
                    if (day <= _this4.state.startDate) {
                        className += " calendar--disabled";
                    }
                } else {
                    className += " calendar--disabled";
                }

                if (_this4.state.startDate && _this4.state.endDate) {
                    if (day > _this4.state.startDate && day < _this4.state.endDate) {
                        className += " calendar--range";
                    }

                    if (day.getTime() === _this4.state.endDate.getTime()) {
                        className += " calendar--range calendar--end";
                    }
                }

                return React.createElement(
                    "div",
                    { className: className, key: "end-" + day.getDate(), onClick: function onClick(_) {
                            return _this4.setEnd(day);
                        } },
                    day.getDate()
                );
            });

            return React.createElement(
                "div",
                { className: "calendars" },
                React.createElement(Calendar, {
                    days: calendarStartDays,
                    month: this.state.startingMonth,
                    changeMonth: this.changeStartingMonth }),
                React.createElement(Calendar, {
                    days: calendarEndDays,
                    month: this.state.endingMonth,
                    changeMonth: this.changeEndingMonth })
            );
        }
    }]);

    return CalendarDatePicker;
}(React.Component);

ReactDOM.render(React.createElement(CalendarDatePicker, null), document.getElementById('app'));