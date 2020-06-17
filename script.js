"use strict";
var DigitOverlay = function (props) {
    var _a = React.useState(""), value = _a[0], setValue = _a[1];
    var getRand = function (min, max) {
        var rand = Math.floor(Math.random() * max) + min, sign = Math.round(Math.random()) * 2 - 1;
        return rand * sign; // Positive or negative;
    };
    var _b = React.useState({ left: getRand(0, 150), top: getRand(0, 150) }), position = _b[0], setPosition = _b[1];
    React.useEffect(function () {
        if (props.value !== "") {
            setPosition({ left: 0, top: 0 });
            setValue(props.value);
        }
        else {
            setPosition({ left: getRand(0, 150), top: getRand(0, 150) });
        }
    }, [props.value]);
    var getStyles = function () {
        var styles = {
            fontSize: "20em",
            left: position.left + "px",
            opacity: 0,
            top: position.top + "px"
        };
        if (props.value !== "") {
            styles.fontSize = "2.5em";
            styles.opacity = 1;
        }
        return styles;
    };
    return (React.createElement("h1", { className: "digit-overlay", style: getStyles() }, value));
};
var Digit = function (props) {
    var _a = React.useState(""), value = _a[0], setValue = _a[1];
    var focus = function (index) {
        document.getElementById("digit-input-" + index).focus();
    };
    React.useEffect(function () {
        setTimeout(function () {
            if (props.index < 6) {
                setValue(props.index.toString());
            }
        }, 50 * props.index);
        setTimeout(function () {
            focus(6);
        }, 400);
    }, []);
    var focusNext = function () {
        var nextIndex = Math.min(props.index + 1, 9);
        focus(nextIndex);
    };
    var focusPrev = function () {
        var prevIndex = Math.max(0, props.index - 1);
        focus(prevIndex);
    };
    var handleOnKeyDown = function (e) {
        if (e.key === "Backspace") {
            setValue("");
            focusPrev();
        }
        else if (!isNaN(e.key)) {
            setValue(e.key);
            focusNext();
        }
    };
    var id = "digit-input-" + props.index;
    return (React.createElement("div", { className: "digit" },
        React.createElement("input", { id: id, type: "text", value: value, onKeyDown: handleOnKeyDown, onChange: function () { } }),
        React.createElement("div", { className: "underline" }),
        React.createElement(DigitOverlay, { value: value })));
};
var App = function (props) {
    var getDigits = function () {
        var digits = [];
        for (var i = 0; i < 10; i++) {
            digits.push(React.createElement(Digit, { key: i, index: i }));
        }
        return digits;
    };
    return (React.createElement("div", { id: "app" },
        React.createElement("div", { id: "phone-number" }, getDigits())));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));