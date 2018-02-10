PlayersService = function PlayersService() {
    var playersData = []
    var myTeam = []

    function loadPlayersData(callBack) {
        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            console.log(playersData)
            return callBack();
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);
        console.log("fetching player data")
        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log(playersData)
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callBack()
        });
        loadPlayersData()
    }

    this.searchedPlayersData = function searchedPlayersData(searchVal, category) {
        var filteredPlayers = playersData.filter(function (player) {
            if (player[category].toLowerCase() == searchVal.toLowerCase()) {
                return true
            }
        })
        return filteredPlayers
    }

    this.searchedPlayersByName = function searchedPlayersByName(searchVal, category) {
        var filteredPlayers = playersData.filter(function (player) {
            if (player.fullname.toLowerCase().includes(searchVal.toLowerCase())) {
                return true
            }
        })
        return filteredPlayers
    }

    //add players to the team and restrict double additions.
    this.addToTeam = function addToTeam(playerId) {
        for (let i = 0; i < myTeam.length; i++) {
            const player = myTeam[i];
            if (playerId == player.id) {
                alert("PLAYER ALREADY ON YOUR TEAM!")
                return
            }
        }
        for (let i = 0; i < playersData.length; i++) {
            const player = playersData[i];
            if (playerId == player.id && myTeam.length < 12) {
                myTeam.push(player)
            }
            if (myTeam.length == 12) {
                alert("TEAM FULL")
                return
            }
        }
    }

    this.teamRestrictions = function teamRestrictions(callWhenDone) {
        debugger
        for (let i = 0; i < myTeam.length; i++) {
            const player = myTeam[i];
            if (player.position == "QB") {
                var count = count++
            }
            if (player.position == "QB" && count == 1) {
                alert("YOU CAN ONLY HAVE ONE QUARTERBACK")
                return
            }
        }
    }

    //removes player from the team.
    this.removeFromTeam = function removeFromTeam(removeId) {
        for (let i = 0; i < myTeam.length; i++) {
            const player = myTeam[i];
            if (removeId == player.id)
                myTeam.splice(i, 1)
        }
    }

    this.getMyTeam = function getMyTeam(callWhenDone) {
        callWhenDone(myTeam)
    }

    //essentially a dummy function to draw the API data, but not display it immediately.
    //allows for the data to only display once someone searches.
    this.firstLoad = function firstLoad() {
        loadPlayersData(console.log)
    }

} 
