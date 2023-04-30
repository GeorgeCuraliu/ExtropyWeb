<!DOCTYPE html>
<html>
<head>
	<title>CENTRE OF PROPAGANDA DISTRIBUTION</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<link rel="stylesheet" href="aum.css">
</head>
<body>
	<div id="members" class="flex"><!--this is used as a container to load the members in(they can be deleted from there)-->
	<div id="programming" class="sections">
	</div>


	<div id="building" class="sections">
	</div>


	<div id="pr" class="sections">
 
	</div>
	</div>


	<div id="new" class="flex">
		<div id="new-member" class="new-section flex"><!--used to create new member-->
			<div id="img-div" class="flex">
				<button id="add-img-butt">Add Image</button>
				<input type="file" id="imageInput" style="position: relative;left:50px;">
				<div id="img-container">
					<img id="new-img" src="" alt="">
				</div>
				<input type="text" placeholder="Name" id="name">
				<label for="departaments"></label>
				<select id="departaments" name="departaments">
  					<option value="programming">Programming</option>
  					<option value="building">Building</option>
  					<option value="pr">PROPAGANDA</option>
				</select>
			</div>
			<textarea rows="4" cols="50" id="description" placeholder="Description of the one who should not be named or talked about  NOTE: the image must be png"></textarea>
			<button id="confirm">Confirm new member</button>
			<div id="dataCheck"></div>
		</div>
		<div id="new-event" class="new-section flex"><!--used tio create a new event in a specific json(or create a new json that will used as a new year for events)-->
			<div id="img-event">
				<button id="add-img-event-butt">Add Image</button>
				<input type="file" id="image-inpu-event" style="position: relative;left:50px;">
				<div id="img-container-event">
					<img id="new-img-event" src="" alt="">
				</div>
				<select name="file" id="event-file-name"></select>
				<input id="event-name" type="text">
				<input id="event-date" type="date">
				<input id="new-json-file-event" type="number" placeholder="format:2019-2020">
				<button id="createJSONfile">Confirm new JSON events file</button>
			</div>
			<textarea placeholder="Please type here the propaganda for this event" rows="4" cols="40" id="announcement"></textarea>
			<button id="cofirm-event">Confirm event</button>
		</div>
	</div>

	<div id="recruits-container"><!--for recruits data and stats-->
		<div id="recruits"><button id="delete-recruits">Delete the data for recruits</button></div>
		<div id="recruits-data">
			<div class="data-section">
				<div class="class" id="7" style="background-color:aquamarine">class 7 </div>
				<div class="class" id="8" style="background-color:blue">class 8 </div>
				<div class="class" id="9" style="background-color:brown">class 9 </div>
				<div class="class" id="10" style="background-color:chocolate">class 10 </div>
				<div class="class" id="11" style="background-color:darkmagenta">class 11 </div>
				<div class="class" id="12" style="background-color:darkorange">class 12 </div>
			</div>
			<br>
			<div class="data-section">
				<div class="class" id="programmingR" style="background-color:aquamarine">programming </div>
				<div class="class" id="buildingR" style="background-color:blue">building </div>
				<div class="class" id="propagandaR" style="background-color:brown">propaganda </div>
			</div>
		</div>
	</div>
	<div id="sponsors">
		<div class="sponsors-section"><!--create new sponsor or delete one-->
			<input type="file" id="image-inpu-sponsor" style="position: relative;left:50px;">
			<button id="add-img-sponsor-butt">Add Image</button>
			<button id="confirm-sponsor">Confirm sponsor</button>
				<div id="img-container-sponsor">
					<img id="new-img-sponsor" src="" alt="">
				</div>
		</div>
		<div class="sponsors-section" id="sponsors-section-2"></div>
	</div>

	<div id="modify-account-type"><!--this will be used for modifing the type of an account(user, member, or something else)-->
            <input class="account-interaction" id="account-user" placeholder="There you set an account as user" type="text">
            <button class="account-interaction" id="confirm-account-user">Confirm account user</button>
            <input class="account-interaction" id="account-member" placeholder="There you set an account as member" type="text">
            <button class="account-interaction" id="confirm-account-member">Confirm account member</button>
			<p class="account-interaction" id="response-paragraph-account"></p>
        </div>
    </div>
	<div id="message-section">
		<img class="message" src="" alt="">
	</div>

	<script src="aum.js" type="module"></script>
</body >
</html>