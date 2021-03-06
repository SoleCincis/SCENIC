// spice-pg connection to db(postgras)
const spicedPg = require("spiced-pg");

let db;

if (process.env.DATABASE_URL) {
  db = spicedPg(process.env.DATABASE_URL);
} else {
  db = spicedPg(`postgres:postgres:postgres@localhost:5432/scenic`);
}
//_________________COMUNICATING WITH DB______________
exports.getScene = id => {
  return db.query(
    `
        SELECT * FROM lines
        WHERE scene_id = $1
 `,
    [id]
  );
};
//___________inserting title getting scene id____________
exports.createScene = title => {
  return db.query(
    `
        INSERT INTO scenes (title)
        VALUES ($1)
        RETURNING id`,
    [title]
  );
};

//__________________creating script_____________________
exports.createDialog = (sceneId, part, dialog) => {
  return db.query(
    `
        INSERT INTO lines (scene_id, part, dialog )
        VALUES ($1, $2, $3 )
        RETURNING id`,
    [sceneId, part, dialog]
  );
};

exports.getScenes = () => {
  return db.query(
    `
        SELECT * FROM scenes
        
 `
  );
};
