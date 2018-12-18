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
VALUES ('Brett', 'no.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Tell him Vincent.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Vincent', 'Royale with Cheese.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Royale with Cheese! Do you know why they call it that?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'Because of the metric system', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Check out the big brain on Brett! You are a smart mother forker! That is right. The metric system.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett','I just want to say how sorry I am that things got so forked up with Mr. Wallace. We got into this thing with the best of intentions.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'I am sorry. Did I break your concentration. You were saying something about best intentions. Oh you were finished. Well allow me to retort.', 1);
