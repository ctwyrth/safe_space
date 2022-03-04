function getRecentPlaces(){
   fetch('http://127.0.0.1:5000/recent_places')
      .then(res =>  res.json())
      .then(data => {
         let users = document.getElementById('safe_body');
         for( let i = 0; i < data.length; i++){
            let row = document.createElement('tr');

            let name = document.createElement('td');
            name.innerHTML = data[i].user_name;
            row.appendChild(name);

            let email = document.createElement('td');
            email.innerHTML = data[i].email;
            row.appendChild(email);
               users.appendChild(row);
         }
      })
}

function register() {
   self.location = "/register"
}

function set_login() {
   const lr_bar = document.getElementById('login_reg');
   
   lr_bar.innerHTML = '<form id="login" action="/login" method="POST"><div class="input-group"><input type="text" name="email" id="email" class="form-control" placeholder="Email" aria-label="Email"><input type="password" name="password" id="password" class="form-control" placeholder="Password" aria-label="Password"><input type="submit" value="Log In" class="btn btn-grass border-0"></div></form>';

   const user_login = document.getElementById('login');
   user_login.onsubmit = function(e) {
      e.preventDefault();
      console.log('The submit was interrupted!')
      let form = new FormData(user_login);
      fetch('http:///127.0.0.1:5000/login', { method: 'POST', body: form })
         .then ( response => response.json() )
         .then ( data => {
            console.log(data);
            let new_html_str = '<form id="login" action="/login" method="POST" class="needs-validation" novalidate><div class="input-group has-validation">';
            let error_str = '<div class="d-flex align-items-center justify-content-left">';
            if (data['error_email']) {
               console.log('There was an email error.');
               new_html_str += '<input type="text" name="email" id="email" class="form-control is-invalid" aria-label="Email" aria-describedby="validationEmail">';
               error_str += '<div id="validationEmail" class="invalid-feedback" style="display: block; width: 42%;">' + data['error_email'] + '</div>';
            } else {
               new_html_str += '<input type="text" name="email" id="email" class="form-control" placeholder="Email"></input>';
            }
            if (data['error_password']) {
               console.log('There was a password error.');
               new_html_str += '<input type="password" name="password" id="password" class="form-control is-invalid" aria-label="Password" aria-describedby="validationEmail">';
               error_str += '<div id="validationEmail" class="invalid-feedback" style="display: block; width: 42%">' + data['error_password'] + '</div>';
            } else {
               new_html_str += '<input type="password" name="password" id="password" class="form-control" placeholder="Password">';
            }
            new_html_str += '<input type="submit" value="Log In" class="btn btn-grass border-0"></div></form>';
            error_str += '</div>';
            console.log(new_html_str);
            lr_bar.innerHTML = new_html_str + error_str;
         })
         .catch( (err) => console.log(err) )
   }
}

const map_search = document.getElementById('map-search-form');
map_search.onsubmit = function(e) {
   e.preventDefault();
   let map_form = new FormData(map_search);
   fetch('http://127.0.0.1:5000/map_search', { method: 'POST', body: form })
      .then ( response => response.json() )
      .then ( data => {
         pass
      })
}



// const add_user_form = document.getElementById('add_user');
// add_user_form.onsubmit = function(e) {
//    e.preventDefault();
//    let form = new FormData(add_user_form);
//    fetch('http://127.0.0.1:5000/create/user', { method: 'POST', body: form })
//       .then( response => response.json() )
//       .then( data => {
//          var users = document.getElementById('users');
//          let row = document.createElement('tr');
//          let name = document.createElement('td');
//          name.innerHTML = data.user_name;
//          row.appendChild(name);
//          let email = document.createElement('td');
//          email.innerHTML = data.email;
//          row.appendChild(email);
//          users.appendChild(row);
//       })
//       .catch( (err) => console.log(err) )

//    document.getElementById('user_name').value = "";
//    document.getElementById('email').value = "";
// }
