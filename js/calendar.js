var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getMonthDaysCount = function getMonthDaysCount(month) {
    var today = new Date();
    var d = new Date(today.getFullYear(), month + 1, 0);

    return d.getDate();
};

var getMonthDays = function getMonthDays(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthDaysCount = getMonthDaysCount(month);

    return Array(monthDaysCount).fill().map(function (_, index) {
        return new Date(year, month, index + 1);
    });
};

var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

var DateDisplay = function (_React$Component) {
    _inherits(DateDisplay, _React$Component);

    function DateDisplay() {
        _classCallCheck(this, DateDisplay);

        return _possibleConstructorReturn(this, (DateDisplay.__proto__ || Object.getPrototypeOf(DateDisplay)).apply(this, arguments));
    }

    _createClass(DateDisplay, [{
        key: "dateToString",
        value: function dateToString(date) {
            var month = date.getMonth() + 1;
            var day = date.getDate();

            if (day < 10) {
                day = "0" + day;
            }

            if (month < 10) {
                month = "0" + month;
            }

            return day + "/" + month + "/" + date.getFullYear();
        }
    }, {
        key: "render",
        value: function render() {
            var startDate = "";
            var endDate = "";
            var clearBtnClass = "date-display__clear";

            if (this.props.startDate) {
                startDate = this.dateToString(this.props.startDate);
            }

            if (this.props.endDate) {
                endDate = this.dateToString(this.props.endDate);
            }

            if (this.props.startDate === null && this.props.endDate === null) {
                clearBtnClass += " hide";
            }

            return React.createElement(
                "div",
                { className: "date-display" },
                React.createElement(
                    "div",
                    { className: "date-display__content" },
                    React.createElement(
                        "span",
                        null,
                        startDate
                    ),
                    " - ",
                    React.createElement(
                        "span",
                        null,
                        endDate
                    )
                ),
                React.createElement(
                    "div",
                    { className: clearBtnClass, onClick: this.props.clearSelection },
                    "Clear"
                )
            );
        }
    }]);

    return DateDisplay;
}(React.Component);

var Calendar = function (_React$Component2) {
    _inherits(Calendar, _React$Component2);

    function Calendar() {
        _classCallCheck(this, Calendar);

        return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
    }

    _createClass(Calendar, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var prevButtonClass = "calendar__prev";
            var nextButtonClass = "calendar__next";

            if (this.props.showPrevButton === false) {
                prevButtonClass += " hide";
            }

            if (this.props.showNextButton === false) {
                nextButtonClass += " hide";
            }

            return React.createElement(
                "div",
                { className: "calendar" },
                React.createElement(
                    "div",
                    { className: "calendar__header" },
                    React.createElement(
                        "div",
                        { className: "calendar__month" },
                        months[this.props.month.getMonth()] + " " + this.props.month.getFullYear()
                    ),
                    React.createElement(
                        "div",
                        { className: "calendar__nav" },
                        React.createElement(
                            "button",
                            { className: prevButtonClass, onClick: function onClick(_) {
                                    return _this3.props.changeMonth(-1);
                                } },
                            "<"
                        ),
                        React.createElement(
                            "button",
                            { className: nextButtonClass, onClick: function onClick(_) {
                                    return _this3.props.changeMonth(1);
                                } },
                            ">"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "calendar__week-days" },
                    React.createElement(
                        "div",
                        null,
                        "S"
                    ),
                    React.createElement(
                        "div",
                        null,
                        "T"
                    ),
                    React.createElement(
                        "div",
                        null,
                        "Q"
                    ),
                    React.createElement(
                        "div",
                        null,
                        "Q"
                    ),
                    React.createElement(
                        "div",
                        null,
                        "S"
                    ),
                    React.createElement(
                        "div",
                        null,
                        "S"
                    ),
                    React.createElement(
                        "div",
                        null,
                        "D"
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

var CalendarDatePicker = function (_React$Component3) {
    _inherits(CalendarDatePicker, _React$Component3);

    function CalendarDatePicker(props) {
        _classCallCheck(this, CalendarDatePicker);

        var _this4 = _possibleConstructorReturn(this, (CalendarDatePicker.__proto__ || Object.getPrototypeOf(CalendarDatePicker)).call(this, props));

        var startingMonth = new Date();
        startingMonth.setDate(1);

        var endingMonth = new Date(startingMonth.getFullYear(), startingMonth.getMonth() + 1);

        _this4.state = {
            startDate: null,
            endDate: null,
            startingMonth: startingMonth,
            endingMonth: endingMonth
        };

        _this4.changeStartingMonth = _this4.changeStartingMonth.bind(_this4);
        _this4.changeEndingMonth = _this4.changeEndingMonth.bind(_this4);
        _this4.clearSelection = _this4.clearSelection.bind(_this4);
        return _this4;
    }

    _createClass(CalendarDatePicker, [{
        key: "setStartDate",
        value: function setStartDate(day) {
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
        key: "setEndDate",
        value: function setEndDate(day) {
            this.setState({
                endDate: day
            });
        }
    }, {
        key: "changeStartingMonth",
        value: function changeStartingMonth(dir) {
            this.setState({
                startingMonth: new Date(this.state.startingMonth.getFullYear(), this.state.startingMonth.getMonth() + dir, 1)
            });
        }
    }, {
        key: "changeEndingMonth",
        value: function changeEndingMonth(dir) {
            this.setState({
                endingMonth: new Date(this.state.endingMonth.getFullYear(), this.state.endingMonth.getMonth() + dir, 1)
            });
        }
    }, {
        key: "clearSelection",
        value: function clearSelection() {
            this.setState({
                startDate: null,
                endDate: null
            });
        }
    }, {
        key: "showNav",
        value: function showNav() {
            var startingMonth = this.state.startingMonth.getMonth();
            var startingYear = this.state.startingMonth.getFullYear();
            var endingMonth = this.state.endingMonth.getMonth();
            var endingYear = this.state.endingMonth.getFullYear();

            if (endingYear > startingYear) {
                return true;
            }

            return endingMonth - startingMonth > 0;
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var startingMonthDays = getMonthDays(this.state.startingMonth);
            var endingMonthDays = getMonthDays(this.state.endingMonth);
            var showNav = this.showNav();

            var calendarStartDays = startingMonthDays.map(function (day) {
                var className = "calendar__day";

                if (day.getDate() === 1) {
                    className += " calendar__day--offset-" + (day.getDay() || 7);
                }

                if (_this5.state.startDate) {
                    if (day.getTime() === _this5.state.startDate.getTime()) {
                        className += " calendar--range calendar--start";
                    }
                }

                if (_this5.state.startDate && _this5.state.endDate) {
                    if (day > _this5.state.startDate && day < _this5.state.endDate) {
                        className += " calendar--range";
                    }
                }

                return React.createElement(
                    "div",
                    { className: className, key: "start-" + day.getDate(), onClick: function onClick(_) {
                            return _this5.setStartDate(day);
                        } },
                    day.getDate()
                );
            });

            var calendarEndDays = endingMonthDays.map(function (day) {
                var className = "calendar__day";

                if (day.getDate() === 1) {
                    className += " calendar__day--offset-" + (day.getDay() || 7);
                }

                if (_this5.state.startDate) {
                    if (day <= _this5.state.startDate) {
                        className += " calendar--disabled";
                    }
                } else {
                    className += " calendar--disabled";
                }

                if (_this5.state.startDate && _this5.state.endDate) {
                    if (day > _this5.state.startDate && day < _this5.state.endDate) {
                        className += " calendar--range";
                    }

                    if (day.getTime() === _this5.state.endDate.getTime()) {
                        className += " calendar--range calendar--end";
                    }
                }

                return React.createElement(
                    "div",
                    { className: className, key: "end-" + day.getDate(), onClick: function onClick(_) {
                            return _this5.setEndDate(day);
                        } },
                    day.getDate()
                );
            });

            return React.createElement(
                "div",
                { className: "date-picker" },
                React.createElement(DateDisplay, {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    clearSelection: this.clearSelection }),
                React.createElement(
                    "div",
                    { className: "calendars" },
                    React.createElement(Calendar, {
                        days: calendarStartDays,
                        month: this.state.startingMonth,
                        changeMonth: this.changeStartingMonth,
                        showPrevButton: true,
                        showNextButton: showNav }),
                    React.createElement(Calendar, {
                        days: calendarEndDays,
                        month: this.state.endingMonth,
                        changeMonth: this.changeEndingMonth,
                        showPrevButton: showNav,
                        showNextButton: true })
                )
            );
        }
    }]);

    return CalendarDatePicker;
}(React.Component);

ReactDOM.render(React.createElement(CalendarDatePicker, null), document.getElementById('app'));