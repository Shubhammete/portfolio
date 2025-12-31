export const lib = [ { tag: 'time',
    is: 'pretty-date',
    script: function() { const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {\r
      month: 'short', day: 'numeric', year: 'numeric'\r
    })\r
    let date = this.date || new Date()\r
    if (typeof date == 'string') date = new Date(date)\r
    this.pretty = DATE_FORMAT.format(date) 
		},
    children: [ { fn: _=>_.pretty } ] } ]