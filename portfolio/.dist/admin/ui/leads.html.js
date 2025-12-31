import { state } from 'state'
export const lib = [ { tag: 'article',
    is: 'contact-list',
    script: function() { const { leads } = this
    const page_size = 15

    Object.defineProperty(this, 'status', { get() {
      const { start=0 } = state
      return `${ start + 1 } – ${ start + page_size } of ${ leads.length }`} })

    this.hasNext = function() {
      return page_size + (state.start || 0) < leads.length
    }

    this.hasPrev = function() {
      return state.start - page_size >= 0
    }

    this.seek = function(direction) {
      state.start = (state.start || 0) + page_size * direction
    }

    state.on('deleted', ({ deleted }) => {
      this.items = this.items.filter(el => el.id != deleted)
      this.update({ message: 'Lead deleted succesfully' })
      setTimeout(() => this.update({ message: null }), 3000)
    })

    state.on('id type query start', args => {
      const { start=0, type, query } = args
      let all = query ? leads.filter(el => el.email.includes(query)) : leads
      this.update({ items: all.slice(start, page_size + start) })
    }) 
		},
    children:
     [ { tag: 'h1', children: [ { text: 'Leads' } ] },
       { tag: 'header',
         children:
          [ { tag: 'input',
              attr:
               [ { name: 'type', val: 'search' },
                 { name: 'name', val: 'query' },
                 { name: 'placeholder', val: 'Search...' },
                 { name: 'value', fn: _=>((state.query)) } ],
              handlers: [ { name: 'oninput', h_fn: (_,$e)=>state.query = $e.target.value } ] },
            { tag: 'nav',
              children:
               [ { tag: 'button',
                   attr:
                    [ { name: 'class', val: 'plain' },
                      { name: 'disabled', fn: _=>(!_.hasPrev()), bool: true } ],
                   handlers: [ { name: 'onclick', h_fn: (_,$e)=>_.seek(-1) } ],
                   children: [ { text: '←' } ] },
                 { tag: 'small', children: [ { fn: _=>_.status } ] },
                 { tag: 'button',
                   attr:
                    [ { name: 'class', val: 'plain' },
                      { name: 'disabled', fn: _=>(!_.hasNext()), bool: true } ],
                   handlers: [ { name: 'onclick', h_fn: (_,$e)=>_.seek(1) } ],
                   children: [ { text: '→' } ] } ] } ] },
       { tag: 'table',
         children:
          [ { tag: 'tr',
              for: { fn: _=>_.items, keys: [ 'el' ], is_entries: false },
              attr: [ { name: 'key', fn: _=>((_.el.id)) } ],
              children:
               [ { tag: 'td',
                   children:
                    [ { tag: 'country-emoji',
                        attr: [ { name: 'code', fn: _=>(_.el.country), is_data: true } ],
                        is_custom: true },
                      { tag: 'a',
                        attr: [ { name: 'href', fn: _=>((_.el.id)) } ],
                        children: [ { fn: _=>(_.el.email) } ] } ] },
                 { tag: 'td', children: [ { fn: _=>(_.el.comment) } ] },
                 { tag: 'td',
                   children:
                    [ { tag: 'pretty-date',
                        attr: [ { name: 'date', fn: _=>(_.el.created), is_data: true } ],
                        is_custom: true } ] },
                 { tag: 'td',
                   children:
                    [ { tag: 'button',
                        attr:
                         [ { name: 'class', val: 'plain' },
                           { name: 'popovertarget', val: 'confirm-delete' },
                           { name: 'title', val: 'Delete' } ],
                        handlers: [ { name: 'onclick', h_fn: (_,$e)=>state.ondelete = _.el.id } ],
                        children: [ { text: '×' } ] } ] } ] } ] },
       { some:
          [ { tag: 'toast',
              attr: [ { name: 'message', fn: _=>_.message, is_data: true } ],
              if: '_.message',
              is_custom: true } ] } ] } ]