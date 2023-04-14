const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "cricketMatchDetails.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
  };
};

const convertDbObjectToResponseObject_match = (dbObject) => {
  return "hiii";
};

app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
    SELECT
      *
    FROM
    player_details;`;
  const playersArray = await database.all(getPlayersQuery);
  response.send(
    playersArray.map((eachPlayer) =>
      convertDbObjectToResponseObject(eachPlayer)
    )
  );
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;

  const getPlayersQuery = `
    SELECT
      *
    FROM
    
    player_details

    where
    
    player_id = ${playerId} 
    
    `;
  const playersArray = await database.get(getPlayersQuery);
  response.send(playersArray);
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;

  const getPlayersQuery = `
    SELECT
      *
    FROM
    
    player_details

    where
    
    player_id = ${playerId} 
    
    `;
  const playersArray = await database.get(getPlayersQuery);
  response.send(playersArray);
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerName } = request.body;
  const { playerId } = request.params;
  const updatePlayerQuery = `
  UPDATE
    player_details 

  SET
    player_name = '${playerName}' ;
 `;

  await database.run(updatePlayerQuery);
  response.send("Player Details Updated");
});

app.get("/matches/:matchId/", async (request, response) => {
  const { matchId } = request.params;

  const getPlayersQuery = `
    SELECT
      *
    FROM
    
    match_details

    where
    
    match_id = ${matchId} 
    
    `;
  const playersArray = await database.get(getPlayersQuery);
  response.send(
    playersArray.map((each) => convertDbObjectToResponseObject_match(each))
  );
});

module.exports = app;
