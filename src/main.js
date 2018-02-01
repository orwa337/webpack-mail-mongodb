import 'webpack-hot-middleware/client';
import './index.html';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

$(() => {
	console.log('jquery is ready');

	$('#root').append(`
			<form id="form-mail">
			  <div class="form-group">
			    <label for="exampleInputEmail1">Email address</label>
			    <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
			    <small id="emailHelp" class="form-text text-muted">Whatever</small>

			    <label for="exampleInputSubject1">Subject</label>
			    <input type="text" class="form-control" name="subject" id="exampleInputSubject1" aria-describedby="subjectHelp" placeholder="Enter subject">
			    <small id="subjectHelp" class="form-text text-muted">Whatever</small>
			  </div>
			  <div class="form-group">
			    <label for="exampleTextarea">Enter mail text</label>
			    <textarea class="form-control" name="text" id="exampleTextarea" rows="3"></textarea>
			  </div>
			  <button type="submit" class="btn btn-primary">Send</button>
			</form>
		`);

	$('#form-mail').on('submit', function(e) {
		  e.preventDefault();

	      $.ajax({
	        url: "http://localhost:3000/sendmail",
	        method: "POST",
	        contentType: "application/json",
	        dataType: "json",
	        data: JSON.stringify({
	           email: $('#form-mail input[name=email]').val(), 
	           subject: $('#form-mail input[name=subject]').val(),
	           text: $('#form-mail textarea[name=text]').val()
	        })
	      })
	      .done(function(data) {
	        console.log('success', data);

	        if(data.err === 0) {
	        	$('#root').empty();
	        	$('#root').append(`
						<div class="alert alert-success">
						  <strong>Success!</strong> Mail was sent.
						</div>	        			
	        		`);
	        }
	        else {
	        	$('#root').empty();
	        	$('#root').append(`
						<div class="alert alert-danger">
						  <strong>No Success!</strong> Mail was not sent.
						</div>      			
	        		`);
	        }
	      })
	      .fail(function(xhr) {
	        console.log('error', xhr);
	      });      
	});

});