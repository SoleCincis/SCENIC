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
VALUES ('Jules', 'Check out the big brain on Brett! You are a smart mother forker! That''s right. The metric system.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett','I just want to say how sorry I am that things got so forked up with Mr. Wallace. We got into this thing with the best intentions.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Oh, I''m sorry. Did I break your concentration. You were saying something about best intentions. Oh you were finished. Well allow me to retort. What does Marsellus Wallace look like?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'What?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'What country you from?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'What?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'What ain''t no country I ever heard of. They speak English in what?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'What?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'English, mother forker, do you speak it?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'Yes', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Then you know what I''m saying. Describe what Marsellus Wallace looks like.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'What?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Say what again, mother forker, I dare you. I double dare you. Say what one god damn more time.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'He''s black.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Go on.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'He''s bald.', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Does he look like a bench?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'What?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Does he look like a bench?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'No!', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Then why''d you try to fork him like a bench?', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Brett', 'I didn''t!', 1);

INSERT into LINES (part, dialog, scene_id)
VALUES ('Jules', 'Yes you did, Brett. Yes you did.', 1);
