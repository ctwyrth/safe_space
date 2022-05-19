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
   
   lr_bar.innerHTML = '<form id="login" action="/login" method="POST"><div class="input-group" id="input-group1"><input type="text" name="email" id="email" class="form-control" placeholder="Email" aria-label="Email"><input type="password" name="password" id="password" class="form-control" placeholder="Password" aria-label="Password"><input type="submit" value="Log In" class="btn btn-grass border-0"></div></form><div class="d-flex align-items-center justify-content-left" id="valid_test"></div>';

   const user_login = document.getElementById('login');
   user_login.onsubmit = function(e) {
      e.preventDefault();
      alert('Running Javascript, running function!')
      console.log('The submit was interrupted!')
      let form = new FormData(user_login);
      fetch('http:///127.0.0.1:5000/login', { method: 'POST', body: form })
         .then ( response => response.json() )
         .then ( data => {
            console.log(data);
            if (data['check'] == 'passed') {
               window.location.replace('/dashboard');
            }
            document.getElementById('login').classList.add('needs-validation');
            document.getElementById('login').setAttribute('novalidate', "");
            document.getElementById('input-group1').classList.add('has-validation');
            let error_str = '';
            if (data['error_email']) {
               console.log('There was an email error.');
               document.getElementById('email').classList.add('is-invalid');
               document.getElementById('email').setAttribute('aria-describedby', 'validationEmail');
               error_str += '<div id="validationEmail" class="invalid-feedback" style="display: block; width: 42%;">' + data['error_email'] + '</div>';
            }
            if (data['error_password']) {
               console.log('There was a password error.');
               document.getElementById('password').classList.add('is-invalid');
               document.getElementById('password').setAttribute('aria-describedby', 'validationPassword');
               error_str += '<div id="validationEmail" class="invalid-feedback" style="display: block; width: 42%">' + data['error_password'] + '</div>';
            }
            // error_str += '';
            document.getElementById('valid_test').innerHTML = error_str;
         })
         .catch( (err) => console.log(err) )
   }
}

// const map_search = document.getElementById('map-search-form');
// map_search.onsubmit = function(e) {
//    e.preventDefault();
//    let map_form = new FormData(map_search);
//    fetch('http://127.0.0.1:5000/map_search', { method: 'POST', body: map_form })
//       .then ( response => response.json() )
//       .then ( data => {
//          var search = new mapkit.Search({
//             language: "en-GB",
//             getsUserLocation: true,
//             region: map.region,
//             limitToCountries: us, ca
//          });

//          search.search(data['map_search'], function(error, data) {
//          if (error) {
//              // Handle search error
//             return;
//          }
//          var annotations = data.places.map(function(place) {
//             var annotation = new mapkit.MarkerAnnotation(place.coordinate);
//             annotation.title = place.name;
//             annotation.subtitle = place.formattedAddress;
//             annotation.color = "#9B6134";
//             return annotation;
//          });
//          map.showItems(annotations);
//      });
//       })
// }



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
