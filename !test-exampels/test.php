<!DOCTYPE html>
<html>
<head>
	<title>Submit Form Data via AJAX</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
	<form>
		<label for="name">Name:</label>
		<input type="text" id="name" name="name"><br>

		<label for="password">Password:</label>
		<input type="password" id="password" name="password"><br>

		<input type="button" value="Submit" onclick="submitForm()">
	</form>

	<script>
		function submitForm() {
			// Get the name and password inputs
			var name = document.getElementById("name").value;
			var password = document.getElementById("password").value;

			// Send the data to the PHP server using AJAX
			$.ajax({
				type: "POST",
				url: "http://localhost:1233/process.php",
				data: { name: name, password: password },
				success: function(response) {
					console.log(response);
				},
				error: function(xhr, status, error) {
					console.error(error, status);
				}
			});
		}
	</script>
</body>
</html>