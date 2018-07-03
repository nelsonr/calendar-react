var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getMonthDays = function getMonthDays(month) {
    var today = new Date();
    var d = new Date(today.getFullYear(), month, 0);

    return d.getDate();
};

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.state = {
            start: null,
            end: null
        };
        return _this;
    }

    _createClass(Calendar, [{
        key: "setStart",
        value: function setStart(day) {
            if (day < this.state.end) {
                this.setState(function (prevState) {
                    return {
                        start: day,
                        end: prevState.end
                    };
                });
            } else {
                this.setState(function (_) {
                    return {
                        start: day,
                        end: null
                    };
                });
            }
        }
    }, {
        key: "setEnd",
        value: function setEnd(day) {
            this.setState(function (prevState) {
                return {
                    start: prevState.start,
                    end: day
                };
            });
        }
    }, {
        key: "generateDays",
        value: function generateDays(days) {
            return {
                start: calendarStartDays,
                end: calendarEndDays
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var days = Array(getMonthDays(5)).fill().map(function (_, index) {
                return index + 1;
            });

            var calendarStartDays = days.map(function (day) {
                var className = "calendar__day";

                if (_this2.state.start) {
                    if (day === _this2.state.start) {
                        className += " calendar--range calendar--start";
                    }
                }

                if (_this2.state.start && _this2.state.end) {
                    if (day > _this2.state.start && day < _this2.state.end) {
                        className += " calendar--range";
                    }
                }

                return React.createElement(
                    "div",
                    { className: className, key: "start-" + day, onClick: function onClick(_) {
                            return _this2.setStart(day);
                        } },
                    day
                );
            });

            var calendarEndDays = days.map(function (day) {
                var className = "calendar__day";

                if (_this2.state.start) {
                    if (day <= _this2.state.start) {
                        className += " calendar--disabled";
                    }
                } else {
                    className += " calendar--disabled";
                }

                if (_this2.state.start && _this2.state.end) {
                    if (day > _this2.state.start && day < _this2.state.end) {
                        className += " calendar--range";
                    }

                    if (day === _this2.state.end) {
                        className += " calendar--range calendar--end";
                    }
                }

                return React.createElement(
                    "div",
                    { className: className, key: "end-" + day, onClick: function onClick(_) {
                            return _this2.setEnd(day);
                        } },
                    day
                );
            });

            return React.createElement(
                "div",
                { className: "calendars" },
                React.createElement(
                    "div",
                    { className: "calendar" },
                    calendarStartDays
                ),
                React.createElement(
                    "div",
                    { className: "calendar" },
                    calendarEndDays
                )
            );
        }
    }]);

    return Calendar;
}(React.Component);

ReactDOM.render(React.createElement(Calendar, null), document.getElementById('app'));