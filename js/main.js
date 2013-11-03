//namespace wordt hier aangemaakt
var FRISBEE = FRISBEE || {}; 


//self invoking function wordt aaangemaakt
(function(){


	//controller
	FRISBEE.controller = {
		init: function(){
			FRISBEE.router.init();
			FRISBEE.score.init();
		}
	};
	
	
	//schedule met key values etc. (+ een array met naamloze objecten) 
	FRISBEE.schedule = function(){
		title: "Pool A - Schedule",
		console.log(title);
	};
	
	
	FRISBEE.directives = {
		schedule: {
			objects: {
				track_score: {
					href: function() {
						return '#/score/' + this.game_id;
					}
				}
			}
		}
	}
	
FRISBEE.score = {
	title: "score",
    score1: 0,
    score2: 0,
	
	
	
    init: function () {
				
		document.getElementById('finalScore').onclick = function () {
			var type 		=  'POST',
			url  		=  'https://api.leaguevine.com/v1/game_scores/',
				postData 	= JSON.stringify({
					game_id: FRISBEE.page.render.score.scoreData.id,
					team_1_score: '1',
					team_2_score: '1',
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
        score1 = 0;
        score2 = 0;
        document.getElementById('addScore1').innerHTML = score1;
        document.getElementById('addScore2').innerHTML = score2;
    }
};

	
	

	
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
			    	FRISBEE.page.render.schedule();
				},

			    '/ranking': function() {
			    	FRISBEE.page.render.ranking();
			    },
				
				'/score/:game_id': function(game_id) { 
					FRISBEE.page.render.score(game_id);	
				},
			    '*': function() {
			    	FRISBEE.page.render.schedule();
			    }
			});
		},
		
		
		
		
		
		
		//Hier wordt de function router.change aangemaakt. Deze code zorgt ervoor dat de pagina "ververst"(oude pagina gaat weg, nieuwe komt terug
		change: function (pageName) {
	
             var route = pageName,
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

            // Zorgt ervoor dat je de actieve sectie kan zien, de overige niet
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            $$('[data-route='+pageName+']')[0].classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }


		}
	};

	
	
	
	
	// Dit zorgt ervoor dat de pages gekoppeld worden aan de .change functie.


		
		
		
		
		
		

		
		
	FRISBEE.page = { 
		render: { 
			schedule: function () {
				$$.get('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=1aa66ab3f7',{},function(data){
					var directives = FRISBEE.directives.schedule;
					FRISBEE.page.render.schedule.poolData = data;
					Transparency.render(qwery('[=schedule]')[0], FRISBEE.page.render.schedule.poolData, directives);
					FRISBEE.router.change('schedule');
					console.log(FRISBEE.page.render.schedule.poolData);
				})
			},
			ranking: function () {
				Transparency.render(qwery('[data-route=ranking]')[0], FRISBEE.ranking);
				FRISBEE.router.change('ranking');
			},
		
			score: function(game_id, pageName) {
				$$.get('https://api.leaguevine.com/v1/games/88454/?access_token=6f143cce7e',{}, function(data) {
					FRISBEE.page.render.score.scoreData = data;
					Transparency.render(qwery('[data-route='+pageName+']')[0], FRISBEE.page.render.score.scoreData);
					FRISBEE.router.change('score');
					console.log(FRISBEE.page.render.score.scoreData);
				});
			}
		}
	}


	
	
	//Initiate the FRISBEElication
	domready(function () {
	    FRISBEE.controller.init();
	    console.log('Init done!')
	});
	
	
	
	
	
	
})();
	