PlayersController = function PlayersController() {
    var loading = true
    var playersService = new PlayersService()


    function getMyTeam() {
        playersService.getMyTeam(drawMyTeam)
    }


    function drawPlayers(arr) {
        playersTemplate = ``
        var playersAvailableElem = document.getElementById('playersAvailable')
        for (var i = 0; i < arr.length; i++) {
            const player = arr[i]
            playersTemplate += `
            <div class="col-3 card m-1 p-1">
            <img class="searchImg" src="${player.photo}" alt="Photo of ${player.fullname}">
            <h4>${player.fullname}</h4>
            <h5>${player.pro_team}</h5>
            <p><strong>${player.position}</strong></p>
            <button class="btn btn-success m-1" onclick="app.controllers.playersCtrl.addToTeam(${player.id})">Add to Team</button>
            </div>
            `
        }
        playersAvailableElem.innerHTML = playersTemplate
    }

    function drawMyTeam(myTeam) {
        myTeamTemplate = ``
        var myTeamElem = document.getElementById('myTeam')
        for (var i = 0; i < myTeam.length; i++) {
            const player = myTeam[i]
            myTeamTemplate += `
            <div class="col-4 card m-1 p-1">
            <img class="myTeamImg" src="${player.photo}" alt="Photo of ${player.fullname}">
            <h4>${player.fullname}</h4>
            <h5>${player.pro_team}</h5>
            <p><strong>${player.position}</strong></p>
            <button class="btn btn-danger" onclick="app.controllers.playersCtrl.removeFromTeam(${player.id})">Remove from Team</button>
            </div>
            `
        }
        myTeamElem.innerHTML = myTeamTemplate
    }

    this.addToTeam = function addToTeam(playerId) {
        playersService.addToTeam(playerId)
        getMyTeam()
    }

    this.teamRestrictions = function teamRestrictions(myTeam) {
        playersService.teamRestrictions(myTeam)
    }

    this.removeFromTeam = function removeFromTeam(removeId) {
        playersService.removeFromTeam(removeId)
        getMyTeam()
    }

    this.searchedPlayersData = function searchedPlayersData(event) {
        event.preventDefault()
        var formData = event.target
        var category = formData.category.value
        var searchVal = formData.searchVal.value
        if (category == "team") {
            category = "pro_team"
        }
        else if (category == "name") {
            category = "fullname"
            var filteredPlayers = playersService.searchedPlayersByName(searchVal, category)
            console.log(filteredPlayers)
            drawPlayers(filteredPlayers)
            return
        }

        var filteredPlayers = playersService.searchedPlayersData(searchVal, category)
        drawPlayers(filteredPlayers)
    }

    playersService.firstLoad()
}