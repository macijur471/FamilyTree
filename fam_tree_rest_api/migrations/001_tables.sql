CREATE TABLE IF NOT EXISTS Individuals (
    id SERIAL PRIMARY KEY,
    names TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    date_of_death DATE,
    gender TEXT NOT NULL,
    hometown TEXT NOT NULL,
    job TEXT,
    hobbies TEXT[]
);

CREATE TABLE IF NOT EXISTS Families (
    id SERIAL PRIMARY KEY,
    author_username VARCHAR(60),
    root_id int UNIQUE NOT NULL,
    family_name VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS IndividualToFamilies (
    individual_id INT REFERENCES Individuals,
    family_id INT REFERENCES Families
);

CREATE TYPE role AS ENUM ('parent', 'child', 'spouse', 'sibling');
CREATE TYPE reltype AS ENUM ('blood', 'married', 'divorced', 'adopted');

CREATE TABLE IF NOT EXISTS Relationships (
    id SERIAL PRIMARY KEY,
    individual_1_id integer REFERENCES Individuals (id) ON DELETE CASCADE,
    individual_2_id integer REFERENCES Individuals (id) ON DELETE CASCADE,
    relationship_type reltype,
    individual_1_role role,
    individual_2_role role
);
