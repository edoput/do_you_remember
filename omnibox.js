import { parseUnit, toNumeral } from "time";

/* Parse the search string for
 * time references
 */
function tokenizeSearch (text)
{
        // catch as many as possible of this numbers with
        // a time quantifier
        var re = /(\d+[d,w,m])/g;
        var matches = text.match(re);
        var startTime = matches.slice(0).reduce((a, e) => {
                var numeral = parseInt(e.match(/(\d+)/));
                var unit = toNumeral(parseUnit(e.match(/([d,w,m])/)[1]));
                var end = a - numeral * unit;
                return end;

        }, Date.now());
        var search_text = text.replace(re, "");
        return {
                "text": search_text,
                "startTime": startTime,
                "endTime": startTime + 1 * toNumeral(day),
        }
}

function suggestYesterdayVisits (text, addSuggestion)
{
        console.log(tokenizeSearch(text));
        browser.history.search(tokenizeSearch(text)).then((items) => {
                addSuggestion(items.map((e) => {
                        return {
                                "content": e.url,
                                "description": e.title,
                        };
                }));
        })
}
browser.omnibox.onInputChanged.addListener(suggestYesterdayVisits);


browser.omnibox.onInputEntered.addListener((url, disposition) => {
        console.log(url);
        console.log(disposition);
        switch (disposition) {
                case "currentTab":
                        browser.tabs.update({url});
                        break;
                case "newForegroundTab":
                        browser.tabs.create({url});
                        break;
                case "newBackgroundTab":
                        browser.tabs.create({url, active: false});
                        break
        }
});
