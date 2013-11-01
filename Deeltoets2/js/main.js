//namespace wordt hier aangemaakt
var FRISBEE = FRISBEE || {}; 


//self invoking function wordt aaangemaakt
(function(){


	//controller
	FRISBEE.controller = {
		init: function(){
		
			FRISBEE.router.init();				 
			document.getElementById('finalScore').onclick = function () {
						var type 		=  'POST',
						url  		=  'https://api.leaguevine.com/v1/game_scores/',
						postData 	= JSON.stringify({
						game_id: '127236',
						team_1_score: FRISBEE.score.getScore1(),
						team_2_score: FRISBEE.score.getScore2(),
						is_final: 'True'
					});

				// Create request
				var xhr = new XMLHttpRequest();

				// Open request
				xhr.open(type,url,true);

				// Set request headers
				xhr.setRequestHeader('Content-type','application/json');
				xhr.setRequestHeader('Authorization','bearer 82996312dc');

				// Send request (with data as a json string)
				xhr.send(postData);
				
				console.log("verzonden");
			};
			

		}
	};
	
	FRISBEE.Tournament = {
			poolData: $$.json('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=1aa66ab3f7',{}, function(data){
			FRISBEE.Tournament.pools = data;
			Transparency.render(qwery('[data-route=schedule')[0], FRISBEE.Tournament.pools);
			console.log(FRISBEE.Tournament.pools);
		})
		
		
	};
	
	
	
	
	//schedule met key values etc. (+ een array met naamloze objecten) 
	FRISBEE.schedule = function(){
		title: "Pool A - Schedule",
		console.log(title);
	};
	

	
FRISBEE.score = {
    score1: 0,
    score2: 0,

    init: function () {
        score1 = parseInt(document.getElementById('addScore1').innerHTML);
        score2 = parseInt(document.getElementById('addScore2').innerHTML);
        document.getElementById('plus1').onclick = function () {
            score1++;
            document.getElementById('addScore1').innerHTML = score1;
            console.log(score1);
        };
        document.getElementById('plus2').onclick = function () {
            score2++;
            document.getElementById('addScore2').innerHTML = score2;
            console.log(score2);
        };
    },

    getScore1: function() {
        return score1;
    },

    getScore2: function() {
        return score2;
    },

    reset: function () {
        score1 = FRISBEE.Tournament.pools.objects[0].team_1_score;
        score2 = FRISBEE.Tournament.pools.objects[0].team_2_score;
        document.getElementById('addScore1').innerHTML = score1;
        document.getElementById('addScore2').innerHTML = score2;
    }
};
	
	

	
	//win check
	/*function won() {
		for(var i = 0; i < FRISBEE.schedule.schedule.length; i++){
			if(FRISBEE.schedule.schedule[i].team1Score > FRISBEE.schedule.schedule[i].team2Score){
			//console.log("Team 1 wint");
			} else{
			//console.log("Team 2 wint");
			}		
		}
	};
	
	console.log(won);
	*/
	
	

	
	// met key values etc. (+ een array met naamloze objecten)
	FRISBEE.ranking = {
		title: "Pool A - Ranking",
		ranking: [
			]
	};
	
	// Router .init wordt hier gemaakt,dit zorgt ervoor dat de nieuwe pagina's aangemaakt worden, hier worden de pagina's genoemd
	FRISBEE.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	FRISBEE.page.schedule();
				},

			    '/ranking': function() {
			    	FRISBEE.page.ranking();
			    },

			    '/score': function () {
			    	FRISBEE.page.score();
			    },
			    '*': function() {
			    	FRISBEE.page.schedule();
			    }
			});
		},
		
		//Hier wordt de function router.change aangemaakt. Deze code zorgt ervoor dat de pagina "ververst"(oude pagina gaat weg, nieuwe komt terug
		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

            // Zorgt ervoor dat je de actieve sectie kan zien, de overige niet
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Dit zorgt ervoor dat de pages gekoppeld worden aan de .change functie.
	FRISBEE.page = {
		schedule: function () {
			Transparency.render(qwery('[data-route=schedule')[0], FRISBEE.schedule);
			FRISBEE.router.change();
		},

		ranking: function () {
			Transparency.render(qwery('[data-route=ranking')[0], FRISBEE.ranking);
			FRISBEE.router.change();
		},
		
		score: function () {
		    Transparency.render(qwery('[data-route=score')[0], FRISBEE.score);
		    FRISBEE.score.reset();
			FRISBEE.router.change();
		}

	};


	
	
	//Initiate the FRISBEElication
	domready(function () {
	    FRISBEE.controller.init();
	    FRISBEE.score.init();
	    console.log('Init done!')
	});
	
})();
	