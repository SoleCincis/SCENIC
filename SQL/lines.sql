DROP TABLE IF EXISTS lines;

CREATE TABLE lines(
    id SERIAL PRIMARY KEY UNIQUE,
    part VARCHAR(200) NOT NULL,
    scene_id INTEGER NOT NULL REFERENCES scenes(id),
    dialog TEXT
);



INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Do you know what they call a Quarter Pounder with Cheese in France?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'Uh no.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Tell him Vincent.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Vincent', 'Royale with Cheese.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Royale with Cheese! Do you know why they call it that?', 1);
