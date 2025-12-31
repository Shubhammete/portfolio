import { state } from 'state'
  import { del } from 'crud'
const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
export const lib = [ { tag: 'time',
    is: 'pretty-date',
    script: function() { this.pretty = this.date ? DATE_FORMAT.format(new Date(this.date)) : '' 
		},
    children: [ { fn: _=>_.pretty } ] },
  { tag: 'b',
    is: 'country-emoji',
    meta: { param: "{ string } code - Two-letter country code (e.g., 'US', 'FR')" },
    script: function() { this.emoji = this.code?.toUpperCase().replace(/./g, c =>
      String.fromCodePoint(c.charCodeAt(0) + 127397)
    ) 
		},
    children: [ { fn: _=>_.emoji } ] },
  { tag: 'toast',
    attr:
     [ { name: 'class', val: 'toast' },
       { name: 'role', fn: _=>(_.role || 'status'), is_data: true } ],
    is_custom: true,
    children: [ { tag: 'p', children: [ { fn: _=>_.message } ] } ] },
  { tag: 'dialog',
    is: 'confirm-delete',
    attr: [ { name: 'id', val: 'confirm-delete' }, { name: 'popover', val: '' } ],
    script: function() { this.onclick = async function() {
      const id = state.id || state.ondelete

      if (id) {
        await del(`/api/admin/leads/${id}`)
        if (state.id) state.id = null
        state.set({ ondelete: null, deleted: id })
      }
    } 
		},
    children:
     [ { tag: 'h2', children: [ { text: 'Delete this lead?' } ] },
       { tag: 'p', children: [ { text: 'This action cannot be undone.' } ] },
       { tag: 'footer',
         children:
          [ { tag: 'button',
              handlers: [ { name: 'onclick', h_fn: (_,$e)=>_.onclick($e) } ],
              attr: [ { name: 'popovertarget', fn: _=>((_.id)) } ],
              children: [ { text: 'Delete' } ] },
            { tag: 'button',
              attr: [ { name: 'class', val: 'plain' }, { name: 'popovertarget', fn: _=>((_.id)) } ],
              children: [ { text: 'Cancel' } ] } ] } ] } ]