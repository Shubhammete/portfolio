import { state } from 'state'
  import { get } from 'crud'
export const lib = [ { tag: 'article',
    is: 'contact-details',
    script: function() { this.onmount = async function() {
      const lead = await get(`/api/admin/leads/${state.id}`)
      this.update(lead)
    } 
		},
    children:
     [ { tag: 'h1', children: [ { text: 'Contact' } ] },
       { tag: 'nav',
         children:
          [ { tag: 'button',
              attr: [ { name: 'onclick', val: 'history.go(-1)' } ],
              children: [ { text: 'Back' } ] },
            { tag: 'button',
              attr: [ { name: 'popovertarget', val: 'confirm-delete' } ],
              children: [ { text: 'Delete' } ] } ] },
       { tag: 'dl',
         children:
          [ { some:
               [ { tag: 'template',
                   if: '_.name',
                   children:
                    [ { tag: 'dt', children: [ { text: 'Name' } ] },
                      { tag: 'dd', children: [ { fn: _=>_.name } ] } ] } ] },
            { tag: 'dt', children: [ { text: 'Email' } ] },
            { tag: 'dd', children: [ { fn: _=>_.email } ] },
            { tag: 'dt', children: [ { text: 'Registered' } ] },
            { tag: 'dd',
              children:
               [ { tag: 'pretty-date',
                   attr: [ { name: 'date', fn: _=>_.created, is_data: true } ],
                   is_custom: true } ] },
            { tag: 'dt', children: [ { text: 'Country' } ] },
            { tag: 'dd',
              children:
               [ { tag: 'country-emoji',
                   attr: [ { name: 'code', fn: _=>_.country, is_data: true } ],
                   is_custom: true },
                 { tag: 'span', children: [ { fn: _=>_.country_name } ] } ] },
            { tag: 'dt', children: [ { text: 'Email' } ] },
            { tag: 'dd', children: [ { fn: _=>_.email } ] },
            { some:
               [ { tag: 'template',
                   if: '_.company_name',
                   children:
                    [ { tag: 'dt', children: [ { text: 'Company' } ] },
                      { tag: 'dd', children: [ { fn: _=>_.company_name } ] } ] } ] },
            { some:
               [ { tag: 'template',
                   if: '_.website',
                   children:
                    [ { tag: 'dt', children: [ { text: 'Website' } ] },
                      { tag: 'dd', children: [ { fn: _=>_.website } ] } ] } ] },
            { tag: 'dt', children: [ { text: 'Mailing list' } ] },
            { tag: 'dd', children: [ { fn: _=>(_.subscribed ? '✅ Member' : '❌ Not member') } ] },
            { some:
               [ { tag: 'template',
                   if: '_.comment',
                   children:
                    [ { tag: 'dt', children: [ { text: 'Comment' } ] },
                      { tag: 'dd', children: [ { fn: _=>_.comment } ] } ] } ] } ] } ] } ]