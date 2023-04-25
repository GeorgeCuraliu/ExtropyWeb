<!DOCTYPE html>
<html>
<head>
	<title>schedule</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="schedule.css">
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    
</head>
 <body>
      <div id="division-container">
        <div id="ideas" class="sections">
            <h2 class="section-title">Ideas</h2>
            <div id="cards-ideas" class="card-container">
                <div id="a0" class="card">
                    <div class="left-card">
                        <div class="card-title">title</div>
                        <div class="card-content">content</div>
                    </div>
                    <div class="right-card">
                        <div class="card-creator">creator</div>
                        <div class="buttons-idea-container">
                            <button id="move-left" class="button-idea fas fa-reply"></button>
                            <button id="delete" class="button-idea fas fa-trash"  ></button>
                            <button id="move-right" class="button-idea fas fa-share"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="card-add-ideas" class="card-add" >
                <button id="card-add-button-ideas" class="card-add-button">+ add element</button>
            </div>
        </div>
        <div id="toDo" class="sections">
            <h2 class="section-title">To do</h2>
            <div id="cards-toDo" class="card-container"></div>
            <div id="card-add-toDo" class="card-add" >
                <button id="card-add-button-ideas" class="card-add-button">+ add element</button>
            </div>

        </div>
        <div id="inProgess" class="sections">
            <h2 class="section-title">In progress</h2>
            <div id="cards-inProgress" class="card-container"></div>
            <div id="card-add-inProgress" class="card-add" >
                <button id="card-add-button-ideas" class="card-add-button">+ add element</button>
            </div>
        </div>
        <div id="Done" class="sections">
            <h2 class="section-title">Done</h2>
            <div id="cards-Done" class="card-container"></div>
            <div id="card-add-Done" class="card-add" >
                <button id="card-add-button-ideas" class="card-add-button">+ add element</button>
            </div>
        </div>
        
      </div>  
      
      <script src="schedule.js"></script>
 </body>
</html>