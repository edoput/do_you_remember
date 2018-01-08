var month = Symbol.for("month");
var week  = Symbol.for("week");
var day = Symbol.for("day");

function parseUnit (text)
{
        switch (text) {
                case "m":
                        return month;
                case "w":
                        return week;
                default:
                        return day;
        }
}

function toNumeral (symbol)
{
        switch (symbol) {
                case week:
                        return 7 * toNumeral(day);
                case month:
                        return 31 * toNumeral(day)
                default:
                        return 24 * 60 * 60 * 1000;
        }
}

export { parseUnit, toNumeral };
