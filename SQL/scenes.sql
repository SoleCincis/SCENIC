DROP TABLE IF EXISTS scenes;

CREATE TABLE scenes(
    id SERIAL PRIMARY KEY UNIQUE,
    title VARCHAR(200) NOT NULL,
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT current_timestamp
);





INSERT INTO scenes (title) VALUES('Royal cheese scene');
