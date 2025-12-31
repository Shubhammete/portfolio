import { post } from 'crud'
export const lib = [ { tag: 'form',
    is: 'contact-form',
    handlers: [ { name: 'onsubmit', h_fn: (_,$e)=>_.submit($e) } ],
    attr: [ { name: 'class', val: 'thin' } ],
    script: function() { this.submit = async function(e) {
      const data = Object.fromEntries(new FormData(e.target))
      await post('/api/leads', data)
      location.href = 'thanks'
    } 
		},
    children:
     [ { tag: 'label',
         children:
          [ { tag: 'h3', children: [ { text: 'Full name' } ] },
            { tag: 'input',
              attr:
               [ { name: 'type', val: 'text' },
                 { name: 'name', val: 'name' },
                 { name: 'required', val: true, bool: true },
                 { name: 'autocomplete', val: 'name' } ] } ] },
       { tag: 'label',
         children:
          [ { tag: 'h3', children: [ { text: 'Company email' } ] },
            { tag: 'input',
              attr:
               [ { name: 'type', val: 'email' },
                 { name: 'name', val: 'email' },
                 { name: 'required', val: true, bool: true },
                 { name: 'autocomplete', val: 'email' } ] } ] },
       { tag: 'label',
         children:
          [ { tag: 'h3', children: [ { text: 'Company website' } ] },
            { tag: 'input',
              attr:
               [ { name: 'type', val: 'url' },
                 { name: 'name', val: 'website' },
                 { name: 'autocomplete', val: 'url' } ] } ] },
       { tag: 'label',
         children:
          [ { tag: 'h3', children: [ { text: 'How can we help?' } ] },
            { tag: 'textarea',
              attr:
               [ { name: 'name', val: 'comment' },
                 { name: 'rows', val: '4' },
                 { name: 'placeholder', val: 'Tell us about your project, needs, and timeline' } ] } ] },
       { tag: 'label',
         children:
          [ { tag: 'input',
              attr:
               [ { name: 'type', val: 'checkbox' },
                 { name: 'name', val: 'subscribed' },
                 { name: 'value', val: '1' } ] },
            { text:
               '\n    Get emails from Acme about product updates. You can unsubscribe at any time.\n  ' } ] },
       { tag: 'p',
         children:
          [ { tag: 'button',
              attr: [ { name: 'type', val: 'submit' } ],
              children: [ { text: 'Submit info' } ] } ] } ] } ]