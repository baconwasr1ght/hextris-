function exportSaveState() {
	var state = {};

	if(gameState == 1 || gameState == -1 || (gameState === 0 && localStorage.getItem('saveState') !== undefined)) {
		state = {
			hex: $.extend(true, {}, MainHex),
			blocks: $.extend(true, [], blocks),
			score: score,
			wavegen: waveone,
			gdx: gdx,
			gdy: gdy,
			comboTime:settings.comboTime
		};

		state.hex.blocks.map(function(a){
			for (var i = 0; i < a.length; i++) {
				a[i] = $.extend(true, {}, a[i]);
			}

			a.map(descaleBlock);
		});

		for (var i = 0; i < state.blocks.length; i++) {
			state.blocks[i] = $.extend(true, {}, state.blocks[i]);
		}

		state.blocks.map(descaleBlock);
	}

	localStorage.setItem('highscores', JSON.stringify(highscores));

	return JSONfn.stringify(state);
}

function descaleBlock(b) {
	b.distFromHex /= settings.scale;
}

function writeHighScores() {
    highscores.sort((a, b) => b - a);
    highscores = highscores.slice(0, 5); // Assuming you want the top 5

    // Loop through high scores and send them one by one
    highscores.forEach(function(score) {
        // Prepare data to be sent to the server
        var data = JSON.stringify({
            score: score
        });

        // AJAX request to the server with jQuery
        $.ajax({
            url: 'yoursavescoreendpointgoeshere', // The URL to your Flask endpoint
            type: 'POST',
            contentType: 'application/json',
            data: data,
            success: function(response) {
                console.log('Score updated!', response);
                // Handle successful score update
            },
            error: function(xhr, status, error) {
                console.error('Failed to update score:', error);
            }
        });
    });

    // After submitting scores, you may want to fetch and update the displayed high scores
}


function clearSaveState() {
	localStorage.setItem("saveState", "{}");
}

function isStateSaved() {
	return localStorage.getItem("saveState") != "{}" && localStorage.getItem("saveState") != undefined;
}
