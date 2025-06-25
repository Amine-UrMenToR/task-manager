
-- Users table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL
);

-- User roles
CREATE TABLE user_roles (
                            user_id INTEGER NOT NULL,
                            role VARCHAR(50) NOT NULL,
                            CONSTRAINT fk_user
                                FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Tasks table
CREATE TABLE tasks (
                       id SERIAL PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       due_date DATE,
                       priority VARCHAR(20),
                       status VARCHAR(20),
                       owner_id INTEGER NOT NULL,
                       CONSTRAINT fk_owner
                           FOREIGN KEY(owner_id) REFERENCES users(id)
);
