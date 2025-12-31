export const lib = [ { tag: 'time',
    is: 'pretty-date',
    script: function() { const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
    let date = this.date || new Date()
    if (typeof date == 'string') date = new Date(date)
    this.pretty = DATE_FORMAT.format(date) 
		},
    children: [ { fn: _=>_.pretty } ] } ]